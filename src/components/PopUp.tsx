import { useState } from "react";
import { TouchableOpacity, View, Text, Modal, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window');

export default function PopUp ({message, visible}: {message: string, visible: boolean}) {

    const errorMessage = message;

    const [popupVisible, setVisible] = useState(visible);

    return(
        <Modal visible={popupVisible} transparent={true} animationType="slide" style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
        }}>
            <View style={{
            }}>
                <View style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    height: height * 1.1,
                    alignItems: 'center',
                    backgroundColor: '#0a0041ab',
                    borderRadius: 20
                }}>
                    <Text style={{
                        fontSize: 30,
                        color: '#f8e8ff'
                    }}>Erro na requisição</Text>
                    <Text style={{
                        fontSize: 30,
                        color: '#f8e8ff'
                    }}>{errorMessage}</Text>
                    <TouchableOpacity onPress={() => setVisible(false)} style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                    }}><Text style={{
                        fontSize: 30,
                        // color: '#f7e3ff',
                        color: '#ff4848',
                        width: 160,
                    }}>Fechar</Text></TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}