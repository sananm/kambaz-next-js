import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";

export const findAllUsers = async () => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/users`);
  return data;
};

export const findEnrolledUsers = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${HTTP_SERVER}/api/courses/${courseId}/users`);
  return data;
};

export const enrollUser = async (courseId: string, userId: string) => {
  const { data } = await axiosWithCredentials.post(`${HTTP_SERVER}/api/courses/${courseId}/enrollments`, { userId });
  return data;
};

export const unenrollUser = async (courseId: string, userId: string) => {
  const { data } = await axiosWithCredentials.delete(`${HTTP_SERVER}/api/courses/${courseId}/enrollments/${userId}`);
  return data;
};
