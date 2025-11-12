import { createSlice } from "@reduxjs/toolkit";
import Database from "../Database";
const initialState = {
  // Database default export is an object: { courses, modules, ... }
  courses: Database.courses,
};
const coursesSlice = createSlice({
 name: "courses",
 initialState,
 reducers: {
   setCourses: (state, { payload: courses }) => {
     state.courses = courses;
   },
   addNewCourse: (state, { payload: course }) => {
     state.courses = [...state.courses, course] as any;
   },
   deleteCourse: (state, { payload: courseId }) => {
     state.courses = state.courses.filter(
       (course: any) => course._id !== courseId
     );
   },
   updateCourse: (state, { payload: course }) => {
     state.courses = state.courses.map((c: any) =>
       c._id === course._id ? course : c
     ) as any;
   },
 },
});
export const { setCourses, addNewCourse, deleteCourse, updateCourse } =
 coursesSlice.actions;
export default coursesSlice.reducer;