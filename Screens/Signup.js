import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from "../Utils/firebase";

const SignUpScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {
        try {
            if (!email || !password || !confirmPassword || !fullName) {
                Alert.alert('Error', 'All fields are required.');
                return;
            }

            if (password !== confirmPassword) {
                Alert.alert('Error', 'Passwords do not match.');
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);

                if (userCredential.user) {
                    await sendEmailVerification(userCredential.user);
                    navigation.navigate('verification');
                }
            } catch (error) {
                console.error('Error sending verification email:', error);
                Alert.alert('Error', 'There was an error sending the verification email.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Sign Up</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    onChangeText={(text) => setFullName(text)}
                    autoCapitalize="words"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => setEmail(text)}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    onChangeText={(text) => setConfirmPassword(text)}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                    <Text style={styles.signInLink}>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#7FFFD4'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: 'auto',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupButton: {
        backgroundColor: '#5c5de5',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
    },
    signInLink: {
        marginTop: 20,
        color: '#5c5de5',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    form: {
        width: '80%',
        height: '80%',
        padding: 50,
        borderRadius: 10,
        backgroundColor: 'white'
    }
});

export default SignUpScreen;
