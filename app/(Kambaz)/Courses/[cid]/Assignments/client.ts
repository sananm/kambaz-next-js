import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";
const axiosWithCredentials = axios.create({ withCredentials: true });

export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/courses/${courseId}/assignments`);
  return data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.post(`${HTTP_SERVER}/api/courses/${courseId}/assignments`, assignment);
  return data;
};

export const updateAssignment = async (courseId: string, assignment: any) => {
  const { data } = await axiosWithCredentials.put(`${HTTP_SERVER}/api/courses/${courseId}/assignments/${assignment._id}`, assignment);
  return data;
};

export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(`${HTTP_SERVER}/api/courses/${courseId}/assignments/${assignmentId}`);
  return data;
};
