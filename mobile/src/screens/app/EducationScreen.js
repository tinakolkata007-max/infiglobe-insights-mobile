import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

const EducationScreen = () => {
  const courses = [
    { title: 'Basic Market Foundation', duration: '4 Weeks' },
    { title: 'Technical Analysis Essentials', duration: '6 Weeks' },
    { title: 'Risk Management for Traders', duration: '3 Weeks' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Education</Text>

      {courses.map(course => (
        <TouchableOpacity key={course.title} style={styles.card}>
          <Text style={styles.cardTitle}>{course.title}</Text>
          <Text style={styles.cardMeta}>{course.duration}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f7ff' },
  contentContainer: { padding: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#1e3a8a', marginBottom: 20 },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: '#dfe7ff' },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#111827' },
  cardMeta: { fontSize: 14, color: '#475569', marginTop: 6 },
});

export default EducationScreen;
