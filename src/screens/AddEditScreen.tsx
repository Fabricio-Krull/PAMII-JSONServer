import axios from "axios";
import react, {useState, useEffect} from "react";
import { FlatList, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Loading from "../components/Loading";
import { TextInput } from "react-native-gesture-handler";

const { height, width } = Dimensions.get('window');

export default function AddEditScreen({ navigation }){

    const [view, setView] = useState("Create");
    const [loading, setLoading] = useState(true);
    const [person, setPerson] = useState({
        nome: "",
        sobrenome: "",
        email: "",
        id: ""
    });

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");

    const clear = () => {
        setId("");
        setEmail("");
        setName("");
        setSurname("");
        setPerson({
            nome: "",
            sobrenome: "",
            email: "",
            id: ""
        });
    }

    useEffect(() => {
        if(id.length == 4)
            axios.get(`http://192.168.0.11:3000/people/${id.toLowerCase()}`).then(response => {
                setPerson(response.data);
            }).catch(error => {
                setPerson({
                    nome: "",
                    sobrenome: "",
                    email: "",
                    id: ""
                });
            })
        else
            setPerson({
                nome: "",
                sobrenome: "",
                email: "",
                id: ""
            });
    }, [id]);

    useEffect(() => {
        clear();
    }, [view]);

    return(

        <View style={{
            height: height * 1.2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: "#1d3557",
        }}>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: "#002950",
                height: height / 6,
                width: width,
                marginBottom: 15,
                justifyContent: 'center',
                alignItems: 'center',
                gap: 10
            }}>

                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 130,
                        backgroundColor: "#0077b6",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5
                    }}
                    onPress={() => navigation.navigate("Home")}
                ><Text style={{color: "#000"}}>Home</Text></TouchableOpacity>
                
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 130,
                        backgroundColor: "#1aa9e2",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#adefff"
                    }}
                ><Text style={{color: "#000"}}>Edit</Text></TouchableOpacity>

            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 50
            }}>

                    <TouchableOpacity style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                            width: 80,
                            backgroundColor: view === "Create" ? "#008ac0" : "#023e7d",
                            borderRadius: 5
                        }}
                        onPress={() => setView("Create")}
                    >
                        <Text style={{color: "#caf0f8"}}>Criar</Text>
                    </TouchableOpacity>



                    <TouchableOpacity style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 30,
                            width: 80,
                            backgroundColor: view === "Update" ? "#008ac0" : "#023e7d",
                            borderRadius: 5
                        }}
                        onPress={() => setView("Update")}
                    >
                        <Text style={{color: "#caf0f8"}}>Atualizar</Text>
                    </TouchableOpacity>

            </View>

            {(view == "Create") ? (
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <TextInput placeholder="Inserir nome" style={{
                            backgroundColor: "#0077b6",
                            width: width / 1.2,
                            borderRadius: 5,
                            margin: 5,
                            marginTop: 50,
                            color: "#caf0f8"
                        }}
                        value={name}
                        onChangeText={setName}

                    ></TextInput>
                    <TextInput placeholder="Inserir sobrenome" style={{
                            backgroundColor: "#0077b6",
                            width: width / 1.2,
                            borderRadius: 5,
                            margin: 5,
                            color: "#caf0f8"
                        }}
                        value={surname}
                        onChangeText={setSurname}
                    
                    ></TextInput>
                    <TextInput placeholder="Inserir email" style={{
                            backgroundColor: "#0077b6",
                            width: width / 1.2,
                            borderRadius: 5,
                            margin: 5,
                            color: "#caf0f8"
                        }}
                        value={email}
                        onChangeText={setEmail}
                    
                    ></TextInput>

                    <TouchableOpacity style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            width: 100,
                            backgroundColor: "#007523",
                            borderRadius: 5
                        }}
                        onPress={() => {
                            if(name && surname && email){
                                let newPerson = person;
                                newPerson.nome = name;
                                newPerson.sobrenome = surname;
                                newPerson.email = email;
                                axios.post("http://192.168.0.11:3000/people", newPerson).then(response => {
                                    alert("Usuário criado com sucesso!");
                                }).finally(() => clear());
                            }
                            else
                                alert("Preencha todos os dados corretamente antes de enviar");

                        }}
                    >
                        
                        <Text style={{color: "#caf0f8"}}>Enviar dados</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                }}>
                    <TextInput placeholder="Inserir id" style={{
                            backgroundColor: "#0077b6",
                            width: width / 1.2,
                            borderRadius: 5,
                            margin: 5,
                            marginTop: 50,
                            color: "#caf0f8"
                        }}
                        value={id}
                        onChangeText={setId}

                    ></TextInput>

                    {(id.length == 4 && person.email != "" && person.nome != "" && person.sobrenome != "") ? (
                        <View style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                        }}>   
                            <TextInput placeholder="Inserir nome" style={{
                                    backgroundColor: "#0077b6",
                                    width: width / 1.2,
                                    borderRadius: 5,
                                    margin: 5,
                                    color: "#caf0f8"
                                }}
                                value={person?.nome}
                                onChangeText={(e) => setPerson({
                                    ...person, nome: e
                                })}
                            
                            ></TextInput>
        
                            <TextInput placeholder="Inserir sobrenome" style={{
                                    backgroundColor: "#0077b6",
                                    width: width / 1.2,
                                    borderRadius: 5,
                                    margin: 5,
                                    color: "#caf0f8"
                                }}
                                value={person?.sobrenome}
                                onChangeText={(e) => setPerson({
                                    ...person, sobrenome: e
                                })}
                            
                            ></TextInput>
                            <TextInput placeholder="Inserir email" style={{
                                    backgroundColor: "#0077b6",
                                    width: width / 1.2,
                                    borderRadius: 5,
                                    margin: 5,
                                    color: "#caf0f8"
                                }}
                                value={person?.email}
                                onChangeText={(e) => setPerson({
                                    ...person, email: e
                                })}
                            
                            ></TextInput>
        
                            <TouchableOpacity style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: 50,
                                    width: 100,
                                    backgroundColor: "#a7aa00",
                                    borderRadius: 5
                                }}

                                onPress={() => {
                                    axios.put(`http://192.168.0.11:3000/people/${person?.id}`, person).then(response =>{
                                        alert("Usuário atualizado com sucesso!");
                                    }).catch(error => {
                                        console.log(error);
                                    }).finally(() => clear())
                                }}
                            ><Text>Enviar dados</Text></TouchableOpacity>
                        </View>
                    ) : (
                        <Loading/>
                    )}

                </View>
            )}
        </View>

    );

}