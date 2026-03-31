import axios from "axios";
import react, {useState, useEffect} from "react";
import { FlatList, Text, View, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import Loading from "../components/Loading";

import { deleteUser, getUsersByName } from "../server/peopleCRUD";
import PopUp from "../components/PopUp";

const { height, width } = Dimensions.get('window');

export default function HomeScreen({ navigation } : {navigation: any}){

    const [people, setPeople] = useState();
    const [loading, setLoading] = useState(true);
    const [nameFilter, setNameFilter] = useState("");
    const [filterType, setFilterType] = useState("startsWith");
    const [filterTypeSymbol, setFilterTypeSymbol] = useState("➡️");
    // atualização de tela em ações do usuário
    const [action, setAction] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [popupVisible, setPopupVisible] = useState(false);

    const deleteMe = (id: string) => {
        deleteUser(id).finally(() => {
            setLoading(true);
            setAction(!action);
            setErrorMessage('');
        }).catch(error => {
            setPopupVisible(true);
            setErrorMessage(error?.message);
        })
    }

    const changeFilter = () => {
        setFilterTypeSymbol(filterTypeSymbol == "➡️" ? "↔️" : "➡️");
        setFilterType(filterType == "startsWith" ? "contains" : "startsWith");
    }

    useEffect(() => {
        // alert(errorMessage);
        getUsersByName(filterType, nameFilter).then(users => {
            setPeople(users);
            setLoading(false);
            setErrorMessage('');
        }).catch(error => {
            setPopupVisible(true);
            setErrorMessage(error?.message);
        });
    }, [action, nameFilter, filterType]);


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
                        backgroundColor: "#1aa9e2",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: "#adefff"
                    }}
                ><Text style={{color: "#000"}}>Home</Text></TouchableOpacity>
                
                <TouchableOpacity
                    style={{
                        height: 50,
                        width: 130,
                        backgroundColor: "#0077b6",
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 5
                    }}
                    onPress={() => navigation.navigate("AddEdit")}
                ><Text style={{color: "#000"}}>Edit</Text></TouchableOpacity>

            </View>

            <View style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: "#13244d",
                borderRadius: 30,
                width: width / 1.2,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 15,
                borderWidth: 1.5,
                borderColor: "#caf0f8"
            }}>
                <TextInput style={{
                        height: "75%",
                        width: "75%",
                        borderRadius: 30,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        backgroundColor: "#192a51",
                        color: "#caf0f8"
                    }}
                    value={nameFilter}
                    onChangeText={setNameFilter}
                >
                </TextInput>
                <TouchableOpacity style={{
                        height: "75%",
                        width: "20%",
                        borderRadius: 30,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        backgroundColor: "#192a51",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={changeFilter}
                ><Text style={{color: "#caf0f8", fontSize: 20, marginBottom: 8}}>{filterTypeSymbol}</Text></TouchableOpacity>
            </View>

            {(people && !loading) ? (
                <View style={{
                        height: height / 1.3,
                    }}>
                    <FlatList
                        data={people}
                        keyExtractor={(item: any) => item.id.toString()}
                        contentContainerStyle={{
                            alignItems: 'center',
                            flexGrow: 1,
                            gap: 20
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
                                <View>
                                    <Text style={{
                                        color: "#fff",
                                        margin: 5,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}>{item?.id} | {item?.nome} {item?.sobrenome}</Text>
                                    <Text style={{
                                        color: "#fff",
                                        margin: 5,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}>{item?.email}</Text>
                                    <Text style={{
                                        color: "#fff",
                                        margin: 5,
                                        marginLeft: 10,
                                        marginRight: 10
                                    }}>{item?.phone}</Text>
                                </View>

                                <TouchableOpacity style={{
                                    height: 50,
                                    width: 50,
                                    backgroundColor: "#c70000",
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    margin: 5,
                                    marginLeft: 'auto'
                                }}

                                onPress={() => deleteMe(item?.id)}
                                
                                ><Text style={{color: "#000"}}>🗑️</Text></TouchableOpacity>

                            </View>
                        )}
                    />
                </View>
            ) : (
                <View style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {(errorMessage.length > 0 && popupVisible) ? (
                        <PopUp visible={popupVisible} message={errorMessage}/>
                    ) : (
                        <Loading/>
                    )}
                </View>
            )}
        </View>

    );

}