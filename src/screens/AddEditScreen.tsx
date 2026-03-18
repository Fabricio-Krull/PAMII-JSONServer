import axios from "axios";
import react, {useState, useEffect} from "react";
import { FlatList, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import Loading from "../components/Loading";
import { TextInput } from "react-native-gesture-handler";
import { urlBase } from "../server/apiJS";

const { height, width } = Dimensions.get('window');

export default function AddEditScreen({ navigation }){

    const [view, setView] = useState("Create");
    const [person, setPerson] = useState({
        nome: "",
        sobrenome: "",
        email: ""
    });
    const [people, setPeople] = useState([]);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [searchType, setSearchType] = useState("id");

    const changeFilter = () => {
        setSearchType(searchType == "id" ? "nome" : "id");
        clear();
    }

    const clear = () => {
        setId("");
        setEmail("");
        setName("");
        setSurname("");
        setPerson({
            nome: "",
            sobrenome: "",
            email: ""
        });
    }

    useEffect(() => {
        if(id.length == 4)
            axios.get(`${urlBase}/people/${id.toLowerCase()}`).then(response => {
                setPerson(response.data);
            }).catch(error => {
                setPerson({
                    nome: "",
                    sobrenome: "",
                    email: ""
                });
            })
        else
            setPerson({
                nome: "",
                sobrenome: "",
                email: ""
            });
    }, [id]);

    useEffect(() => {
        axios.get(`${urlBase}/people?nome:startsWith=${name}`).then(response => {
            setPeople(response.data);
        });
    }, [name]);

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
                            borderRadius: 5,
                            borderWidth: view === "Create" ? 1 : 0,
                            borderColor: view === "Create" ? "#adefff" : ""
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
                            borderRadius: 5,
                            borderWidth: view === "Update" ? 1 : 0,
                            borderColor: view === "Update" ? "#adefff" : ""
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
                                axios.post(`${urlBase}/people`, newPerson).then(response => {
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
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: width / 1.2,
                        height: height / 8,
                        alignItems: 'center',
                        margin: 5,
                        marginTop: 50,
                        justifyContent: 'center',
                    }}>
                        <TextInput placeholder={`Inserir ${searchType}`} style={{
                                height: "50%",
                                backgroundColor: "#0077b6",
                                borderRadius: 5,
                                width: "75%",
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                color: "#caf0f8"
                            }}
                            value={searchType =="id" ? id : name}
                            onChangeText={searchType =="id" ? setId : setName}

                        >
                        </TextInput>
                        <TouchableOpacity style={{
                                height: "50%",
                                width: "25%",
                                backgroundColor: "#023e7d",
                                borderRadius: 5,
                                borderTopLeftRadius: 0,
                                borderBottomLeftRadius: 0,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={changeFilter}
                        ><Text style={{color: "#caf0f8", fontSize: 20, marginBottom: 8}}>{searchType}</Text></TouchableOpacity>
                    </View>

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
                                    axios.put(`${urlBase}/people/${person?.id}`, person).then(response =>{
                                        alert("Usuário atualizado com sucesso!");
                                    }).catch(error => {
                                        console.log(error);
                                    }).finally(() => clear())
                                }}
                            ><Text>Enviar dados</Text></TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            {(people?.length > 0 && searchType == "nome") ? (
                                <View style={{
                                    height: height / 1.75,
                                }}>

                                    <FlatList
                                        data={people}
                                        keyExtractor={(item: any) => item.id.toString()}
                                        contentContainerStyle={{
                                            alignItems: 'center',
                                            flexGrow: 1,
                                            gap: 20,
                                        }}
                                        renderItem={( { item } ) => (
    
                                            <View style={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                gap: 1,
                                                borderWidth: 1,
                                                borderRadius: 10,
                                                borderColor: "#669bbc",
                                                width: width / 1.3,
                                                paddingLeft: 10
                                            }}>
                                                <TouchableOpacity style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    // borderColor: '#5ac05f',
                                                    // borderWidth: 1,
                                                    height: "90%",
                                                    alignSelf: 'center',
                                                    borderRadius: 5
                                                }}
                                                    onPress={() => {
                                                        // alert(JSON.stringify(item));
                                                        setId(item?.id);
                                                        setSearchType("id");
                                                    }}
                                                ><Text style={{fontSize: 35, display: 'flex', justifyContent: 'center', alignContent: 'center'}}>✅</Text>
                                                </TouchableOpacity>
                                                <View>
                                                    <Text style={{
                                                        color: "#fff",
                                                        margin: 5,
                                                        marginLeft: 10,
                                                        marginRight: 10
                                                    }}>{item?.nome} {item?.sobrenome}</Text>
                                                    <Text style={{
                                                        color: "#fff",
                                                        margin: 5,
                                                        marginLeft: 10,
                                                        marginRight: 10
                                                    }}>{item?.email}</Text>
                                                </View>
    
                                            </View>
                                        )}
                                    />
                                </View>
                            ) : (
                                <Loading/>

                            )}
                        </>
                    )}

                </View>
            )}
        </View>

    );

}