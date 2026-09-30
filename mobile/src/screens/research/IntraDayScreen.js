import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setIntraDayReports, setLoading} from '../../store/slices/researchSlice';
import {fetchIntraDayReports} from '../../services/researchService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const IntraDayScreen = () => {
  const dispatch = useDispatch();
  const {intraDayReports, loading} = useSelector(state => state.research);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      dispatch(setLoading(true));
      const data = await fetchIntraDayReports();
      dispatch(setIntraDayReports(data.research || []));
    } catch (error) {
      console.error('Failed to load intraday reports:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <MaterialIcons name="trending-up" size={32} color="#1e40af" />
        <Text style={styles.title}>Intraday Research</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pre-Market Report</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Global Cues & Market View</Text>
          <Text style={styles.cardText}>Updated at 09:15 AM</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Important News Updates</Text>
        {intraDayReports.length > 0 ? (
          intraDayReports.map((report, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{report.title}</Text>
              <Text style={styles.cardText}>{report.content?.substring(0, 100)}...</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No reports available</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Analyst Market View</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Market Volatility: Moderate</Text>
          <Text style={styles.cardText}>Nifty levels: 23,100 - 23,500</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={loadReports}>
        <MaterialIcons name="refresh" size={24} color="#fff" />
        <Text style={styles.refreshText}>Refresh</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f7ff'},
  contentContainer: {padding: 16},
  header: {flexDirection: 'row', alignItems: 'center', marginBottom: 24},
  title: {fontSize: 28, fontWeight: '700', color: '#1e3a8a', marginLeft: 12},
  section: {marginBottom: 20},
  sectionTitle: {fontSize: 16, fontWeight: '700', color: '#1e3a8a', marginBottom: 12},
  card: {backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#dfe7ff'},
  cardTitle: {fontSize: 16, fontWeight: '600', color: '#111827', marginBottom: 6},
  cardText: {fontSize: 14, color: '#475569'},
  emptyText: {fontSize: 14, color: '#999', textAlign: 'center', marginVertical: 16},
  refreshButton: {backgroundColor: '#1e40af', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20},
  refreshText: {color: '#fff', fontWeight: '600', marginLeft: 8},
});

export default IntraDayScreen;
