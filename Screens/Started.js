import { View, Text, Button, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';


const GetStartedScreen = ({ navigation }) => {
    const handleStart = () => {
        navigation.navigate('SignUp');
    };

    return (
        <View style={styles.container}>
            <Animatable.Text
                animation="flash"
                easing="ease-out"
                iterationCount="infinite"
                style={styles.title}
            >
                Welcome to DTRACK!
            </Animatable.Text>
            <Text style={styles.body} >Start your fitness journey now</Text>
            <View style={styles.buttonContainer}>
                <Button title="Get Started" color="#5c5de5" onPress={handleStart} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#7FFFD4',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        color: 'red'
    },
    buttonContainer: {
        marginTop: 20,
        borderRadius: 10,
        overflow: 'hidden',
        width: 200,
    },
    body: {
        fontSize: 20,
        color: 'blue'
    }
});

export default GetStartedScreen;
