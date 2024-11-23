import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteModule = async (moduleId: string) => {
 const response = await axios.delete(`${ASSIGNMENTS_API}/${moduleId}`);
 return response.data;
};

export const updateModule = async (module: any) => {
    const { data } = await axios.put(`${ASSIGNMENTS_API}/${module._id}`, module);
    return data;
  };
  