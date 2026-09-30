import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

const ResearchScreen = () => {
  const modules = ['Intraday', 'Swing', 'Investment', 'Model Portfolio', 'Algo Redirect'];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Research Center</Text>

      {modules.map(item => (
        <TouchableOpacity key={item} style={styles.itemCard}>
          <Text style={styles.itemTitle}>{item}</Text>
          <Text style={styles.itemSubtitle}>Open service details and approved research.</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7ff' },
  contentContainer: { padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#1e3a8a', marginBottom: 20 },
  itemCard: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#dfe7ff' },
  itemTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  itemSubtitle: { fontSize: 14, color: '#475569', marginTop: 4 },
});

export default ResearchScreen;
