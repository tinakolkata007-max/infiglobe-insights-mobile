import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {registerUser, sendOTP} from '../../services/authService';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !phone || !password) {
      Alert.alert('Validation', 'Please fill all fields.');
      return;
    }

    try {
      setLoading(true);
      await registerUser(email, phone, password);
      await sendOTP(email);
      Alert.alert('Register success', 'OTP sent to your email.');
      navigation.navigate('OTP', {email});
    } catch (error) {
      Alert.alert('Registration failed', error.message || 'Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <TextInput style={styles.input} placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Phone" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <TouchableOpacity style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
        <Text style={styles.primaryButtonText}>{loading ? 'Creating...' : 'Register'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f5f7ff' },
  title: { fontSize: 28, fontWeight: '700', color: '#1e3a8a', marginBottom: 20 },
  input: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 14, borderWidth: 1, borderColor: '#dfe7ff' },
  primaryButton: { backgroundColor: '#1e40af', paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  primaryButtonText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  linkText: { marginTop: 18, textAlign: 'center', color: '#1e40af', fontWeight: '600' },
});

export default RegisterScreen;
