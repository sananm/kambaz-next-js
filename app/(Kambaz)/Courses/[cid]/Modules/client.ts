import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`/api/courses/${courseId}/modules`);
  return data;
};

export const createModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.post(`/api/courses/${courseId}/modules`, module);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`/api/courses/${courseId}/modules/${moduleId}`);
  return data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.put(`/api/courses/${courseId}/modules/${module._id}`, module);
  return data;
};
