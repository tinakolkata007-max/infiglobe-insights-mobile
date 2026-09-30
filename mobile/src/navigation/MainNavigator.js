import React from 'react';
import {useSelector} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import KYCScreen from '../screens/auth/KYCScreen';

// App Screens
import DashboardScreen from '../screens/app/DashboardScreen';
import ResearchScreen from '../screens/app/ResearchScreen';
import IntraDayScreen from '../screens/research/IntraDayScreen';
import EducationScreen from '../screens/app/EducationScreen';
import ProfileScreen from '../screens/app/ProfileScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      animationEnabled: true,
    }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="OTP" component={OTPScreen} />
    <Stack.Screen name="KYC" component={KYCScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: true,
      tabBarActiveTintColor: '#1e40af',
      tabBarInactiveTintColor: '#999',
      tabBarLabelStyle: {fontSize: 12},
    }}>
    <Tab.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="home" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Research"
      component={ResearchScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="trending-up" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Education"
      component={EducationScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="school" size={24} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialIcons name="person" size={24} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainNavigator = () => {
  const {token} = useSelector(state => state.auth);
  const {kycStatus} = useSelector(state => state.user);

  if (!token) {
    return <AuthNavigator />;
  }

  if (kycStatus !== 'verified') {
    return <KYCScreen />;
  }

  return <AppNavigator />;
};

export default MainNavigator;