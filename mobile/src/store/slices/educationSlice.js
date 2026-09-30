import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  courses: [],
  enrolledCourses: [],
  progress: {},
  selectedCourse: null,
  loading: false,
  error: null,
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
});

export const {setCourses, setEnrolledCourses, setProgress, setSelectedCourse} = educationSlice.actions;
export default educationSlice.reducer;