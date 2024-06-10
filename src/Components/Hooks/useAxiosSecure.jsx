import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://employee-management-server-sigma.vercel.app',
  
  });

const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;