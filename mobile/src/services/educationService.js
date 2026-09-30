import apiClient from './apiClient';

export const fetchCourses = async () => {
  try {
    const response = await apiClient.get('/education/courses');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchCourseDetail = async (courseId) => {
  try {
    const response = await apiClient.get(`/education/courses/${courseId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const enrollCourse = async (courseId) => {
  try {
    const response = await apiClient.post('/education/enroll', {courseId});
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const fetchProgress = async () => {
  try {
    const response = await apiClient.get('/education/progress');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};