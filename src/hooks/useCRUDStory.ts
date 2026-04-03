import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { message } from "antd";

const API_URL = "http://localhost:3000/stories";

export const useCRUDStory = () => {
  const queryClient = useQueryClient();

 
  const { data: list, isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const { data } = await axios.get(API_URL);
      return data;
    },
  });


  const { mutate: add, isPending: isAdding } = useMutation({
    mutationFn: async (newStory: any) => await axios.post(API_URL, newStory),
    onSuccess: () => {
      message.success("Thêm truyện thành công!");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  
  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: async (id: number | string) => await axios.delete(`${API_URL}/${id}`),
    onSuccess: () => {
      message.success("Xóa truyện thành công!");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  
  const { mutate: update, isPending: isUpdating } = useMutation({
    
    mutationFn: async ({ id, ...updateData }: any) => {
      return await axios.put(`${API_URL}/${id}`, updateData);
    },
    onSuccess: () => {
      message.success("Cập nhật truyện thành công!");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  
  return { 
    list, isLoading, 
    add, isAdding, 
    remove, isDeleting, 
    update, isUpdating 
  };
};