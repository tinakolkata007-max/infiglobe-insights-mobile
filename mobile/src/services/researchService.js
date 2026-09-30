import apiClient from './apiClient';

export const fetchIntraDayReports = async () => {
  try {
    const response = await apiClient.get('/research/intraday');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchSwingResearch = async () => {
  try {
    const response = await apiClient.get('/research/swing');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchInvestmentResearch = async () => {
  try {
    const response = await apiClient.get('/research/investment');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchModelPortfolio = async () => {
  try {
    const response = await apiClient.get('/research/model-portfolio');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};