import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Dashboard</Text>
      <Text style={styles.greeting}>Welcome back, Investor</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Summary</Text>
        <Text style={styles.cardText}>KYC Status: Verified</Text>
        <Text style={styles.cardText}>Active Plan: Research Plus</Text>
        <Text style={styles.cardText}>Remaining Validity: 18 Days</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Access</Text>
        <Text style={styles.cardText}>• Intraday Research</Text>
        <Text style={styles.cardText}>• Swing Research</Text>
        <Text style={styles.cardText}>• Education Courses</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7ff' },
  contentContainer: { padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#1e3a8a', marginBottom: 8 },
  greeting: { fontSize: 16, color: '#475569', marginBottom: 18 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#dfe7ff' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111827', marginBottom: 12 },
  cardText: { fontSize: 14, color: '#374151', marginBottom: 6 },
});

export default DashboardScreen;
