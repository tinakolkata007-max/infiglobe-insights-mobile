import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {verifyOTP} from '../../services/authService';

const OTPScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const email = route.params?.email || '';
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert('Validation', 'Please enter the OTP.');
      return;
    }

    try {
      setLoading(true);
      const response = await verifyOTP(email, otp);
      console.log('OTP verified', response);
      navigation.navigate('KYC');
    } catch (error) {
      Alert.alert('OTP failed', error.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>We sent a 6-digit code to {email}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        maxLength={6}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleVerifyOTP} disabled={loading}>
        <Text style={styles.primaryButtonText}>{loading ? 'Verifying...' : 'Verify OTP'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: '#f5f7ff' },
  title: { fontSize: 28, fontWeight: '700', color: '#1e3a8a', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#475569', marginBottom: 18 },
  input: { backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16, borderWidth: 1, borderColor: '#dfe7ff' },
  primaryButton: { backgroundColor: '#1e40af', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default OTPScreen;
