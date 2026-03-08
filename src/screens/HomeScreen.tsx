import axios from "axios";
import react, {useState, useEffect} from "react";
import { FlatList, Text, View } from 'react-native';

export default function HomeScreen(){

    const [people, setPeople] = useState();

    useEffect(() => {
        axios.get("http://localhost:3000/people").then(response => {
            setPeople(response.data);
        })
    }, []);

    return(

        <View>
            <FlatList 
                data={people}
                keyExtractor={(item: any) => item.id.toString()}
                renderItem={( { item } ) => (
                    <View>
                        <Text>{item?.nome} - {item?.sobrenome}</Text>
                        <Text>{item?.email}</Text>
                    </View>
                )}
            />
        </View>

    );

}