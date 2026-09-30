import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const ProfileScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>Investor Name</Text>

        <Text style={styles.label}>Phone</Text>
        <Text style={styles.value}>+91 98765 43210</Text>

        <Text style={styles.label}>KYC</Text>
        <Text style={styles.value}>Verified</Text>

        <Text style={styles.label}>Preferred language</Text>
        <Text style={styles.value}>English</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7ff' },
  contentContainer: { padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#1e3a8a', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, borderWidth: 1, borderColor: '#dfe7ff' },
  label: { fontSize: 12, color: '#64748b', marginTop: 10 },
  value: { fontSize: 16, color: '#111827', fontWeight: '600' },
});

export default ProfileScreen;
