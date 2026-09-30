import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../config/constants';
import axios from 'axios';

const authClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const initializeAuth = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      authClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
  }
};

export const registerUser = async (email, phone, password) => {
  try {
    const response = await authClient.post('/auth/register', {
      email,
      phone,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const sendOTP = async (email) => {
  try {
    const response = await authClient.post('/auth/send-otp', {email});
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await authClient.post('/auth/verify-otp', {email, otp});
    const {token, refreshToken} = response.data;
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    authClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await authClient.post('/auth/login', {email, password});
    const {token, refreshToken} = response.data;
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    authClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutUser = async () => {
  try {
    await authClient.post('/auth/logout');
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('refreshToken');
    delete authClient.defaults.headers.common['Authorization'];
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export default authClient;