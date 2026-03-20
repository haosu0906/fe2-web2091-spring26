import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, message, Spin } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function EditStory(){
    const [form] = Form.useForm();
    const {id} = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {data, isLoading} = useQuery({
        queryKey: ["story", id],
        queryFn: async () =>{
            const res = await axios.get(`http://localhost:3000/stories/${id}`);
            return res.data;
        }
    });

    useEffect(() =>{
        if(data){
            form.setFieldsValue(data);
        }
    }, [data]);
    const mutation = useMutation({
        mutationFn: async(values:any) =>{
            return axios.patch(`http://localhost:3000/stories/${id}`, values);

        },
        onSuccess: () =>{
            message.success("Cập nhật truyện thành công!");
            queryClient.invalidateQueries({ queryKey: ["stories"] });
            navigate("/lab5");
        },
    });

    const onFinish = (values: any) =>{
       mutation.mutate(values);

    };
    if(isLoading) return <Spin />;

    return (
       <Form form={form} layout="vertical" onFinish={onFinish} disabled={mutation.isPending}>
      <Form.Item 
        name="title" 
        label="Tên truyện"
        rules={[
            {required: true, message:"vui long nhap ten truyen"}
        ]}
        >
        <Input />
      </Form.Item>

      <Form.Item label="Tác giả"
        name="author"
        rules={[{ required: true, message: "Vui lòng nhập tên tác giả!" }]}>
        <Input />
      </Form.Item>

      <Form.Item name="image" label="Ảnh">
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Mô tả">
        <Input.TextArea />
      </Form.Item>

      <Form.Item name="createdAt" label="ngày tạo">
        <Input />
      </Form.Item>

      <Button type="primary"
          htmlType="submit"
          loading={mutation.isPending}>
        Cập nhật
      </Button>
       
    </Form>
    )
}
