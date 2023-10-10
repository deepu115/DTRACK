import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ route }) => {
    const { fullName } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.fullName}>Hello, {fullName}</Text>
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
        fontWeight: 'bold',
        marginBottom: 20,
    },
    fullName: {
        fontSize: 18,
    },
});

export default HomeScreen;
