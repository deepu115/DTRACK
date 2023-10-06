import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { sendEmailVerification, auth } from '../Utils/firebase';

const VerificationPendingScreen = ({ navigation }) => {
    const handleResendEmail = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                await sendEmailVerification(user);
                Alert.alert('Success', 'Verification email resent. Please check your inbox.');
            }
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verification Email Sent</Text>
            <Text>Please check your email to complete the registration process.</Text>
            <TouchableOpacity style={styles.resendButton} onPress={handleResendEmail}>
                <Text style={styles.resendButtonText}>Resend Email</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.signInLink}>Email Verified? Sign In</Text>
            </TouchableOpacity>
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
    resendButton: {
        backgroundColor: '#5c5de5',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
    },
    resendButtonText: {
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
});

export default VerificationPendingScreen;
