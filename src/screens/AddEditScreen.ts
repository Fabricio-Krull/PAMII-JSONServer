import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    
    body: {
        height: height * 1.2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: "#1d3557",
    },

    container: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: "#002950",
        height: height / 6,
        width: width,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },

    

});

export {styles};