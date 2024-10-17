import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const defaults = {
    baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/',
    // headers: () => ({
    //     'Content-Type': 'application/json',
    //     // 'Accept': 'application/json',
    //     // Authorization: getStoredAuthToken() // incomplete
    // })
    headers: {
      'Content-Type': 'application/json'
    }
  };

const hooks = {
    useErrandTableData: () => {
        return useQuery({
            queryKey: ['errands-data'],
            queryFn: async () => {
                const response = await axios.request({
                    method: 'get',
                    url: `${defaults.baseURL}get-all-errands`,
                    headers: defaults.headers
                });
                return response?.data;
            }
        })
    },
    useUpdateErrandStatus: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: async (data: { id: string, status: boolean }) => {
                const response = await axios.request({
                    method: 'patch',
                    url: `${defaults.baseURL}update-errand-status`,
                    data: {
                        id: data.id,
                        status: data.status
                    }
                });
                return response?.data;
            },
            onSuccess: () => {
                queryClient.invalidateQueries(['errands-data']);
            },
            onError: (error) => {
                console.error('Error updating errand status:', error);
            }
        })
    }
};

export default hooks;