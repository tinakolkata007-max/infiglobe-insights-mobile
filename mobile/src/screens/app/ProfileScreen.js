import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setUserData, setSubscriptions} from '../../store/slices/userSlice';
import {logoutUser} from '../../services/authService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const {id, email, phone, name, subscriptions} = useSelector(state => state.user);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {text: 'Cancel', onPress: () => {}},
      {
        text: 'Logout',
        onPress: async () => {
          try {
            setLoading(true);
            await logoutUser();
            dispatch(setUserData({}));
          } catch (error) {
            Alert.alert('Error', 'Failed to logout');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{name?.charAt(0) || 'U'}</Text>
        </View>
        <Text style={styles.name}>{name || 'User'}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Account Information</Text>

        <View style={styles.row}>
          <MaterialIcons name="email" size={20} color="#1e40af" />
          <View style={styles.info}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email || 'Not provided'}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <MaterialIcons name="phone" size={20} color="#1e40af" />
          <View style={styles.info}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{phone || 'Not provided'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Active Subscriptions</Text>
        {subscriptions && subscriptions.length > 0 ? (
          subscriptions.map((sub, index) => (
            <View key={index}>
              <View style={styles.row}>
                <MaterialIcons name="verified" size={20} color="#22c55e" />
                <View style={styles.info}>
                  <Text style={styles.label}>Plan {index + 1}</Text>
                  <Text style={styles.value}>{sub.status}</Text>
                </View>
              </View>
              {index < subscriptions.length - 1 && <View style={styles.divider} />}
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No active subscriptions</Text>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} disabled={loading}>
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>{loading ? 'Logging out...' : 'Logout'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f7ff'},
  contentContainer: {padding: 16},
  header: {alignItems: 'center', marginBottom: 24},
  avatar: {width: 80, height: 80, borderRadius: 40, backgroundColor: '#1e40af', justifyContent: 'center', alignItems: 'center', marginBottom: 12},
  avatarText: {fontSize: 32, color: '#fff', fontWeight: '700'},
  name: {fontSize: 24, fontWeight: '700', color: '#1e3a8a'},
  card: {backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#dfe7ff'},
  sectionTitle: {fontSize: 16, fontWeight: '700', color: '#1e3a8a', marginBottom: 12},
  row: {flexDirection: 'row', alignItems: 'center', marginVertical: 10},
  info: {marginLeft: 12, flex: 1},
  label: {fontSize: 12, color: '#64748b'},
  value: {fontSize: 14, color: '#111827', fontWeight: '600'},
  divider: {height: 1, backgroundColor: '#dfe7ff', marginVertical: 8},
  emptyText: {fontSize: 14, color: '#999', textAlign: 'center', marginVertical: 12},
  logoutButton: {backgroundColor: '#ef4444', borderRadius: 12, paddingVertical: 14, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20},
  logoutText: {color: '#fff', fontWeight: '600', marginLeft: 8},
});

export default ProfileScreen;
