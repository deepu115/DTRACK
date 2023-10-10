
import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, signInWithEmailAndPassword, collection, query, where, getDocs, db } from "../Utils/firebase";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user && user.emailVerified) {

                fetchUserProfile(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserProfile = async (uid) => {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where("uid", "==", uid));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const fullName = userDoc.data().fullName;
                navigation.navigate('Home', { fullName });
            } else {
                // Handle the case where the user's profile is not found in Firestore
                console.error('User profile not found in Firestore.');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleLogin = async () => {
        try {
            if (!email || !password) {
                Alert.alert('Error', 'Both email and password are required.');
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            if (userCredential.user) {
                if (userCredential.user.emailVerified) {
                    fetchUserProfile(userCredential.user.uid);
                } else {
                    navigation.navigate('VerificationPending');
                }
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Login</Text>
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
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                    <Text style={styles.signUpLink}>Don't have an account? Sign Up</Text>
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
    loginButton: {
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
    signUpLink: {
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

export default LoginScreen;
