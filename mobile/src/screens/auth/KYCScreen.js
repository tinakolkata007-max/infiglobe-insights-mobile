import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const KYCScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KYC Verification</Text>
      <Text style={styles.text}>Your KYC is required before you can access research plans and paid services.</Text>

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Dashboard')}>
        <Text style={styles.primaryButtonText}>Continue to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#f5f7ff', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#1e3a8a', marginBottom: 12 },
  text: { fontSize: 16, color: '#475569', marginBottom: 24, lineHeight: 24 },
  primaryButton: { backgroundColor: '#1e40af', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

export default KYCScreen;
