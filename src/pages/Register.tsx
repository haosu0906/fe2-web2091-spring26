import { Form, Input, Button, message } from "antd";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "../stores/useAuthStores.ts";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const res = await axios.post("http://localhost:3000/register", values);
      return res.data;
    },
    onSuccess: (data) => {
      message.success("Đăng ký thành công!");
      
      
      setUser({
        email: data.user.email,
        name: data.user.username || "User Mới",
        token: data.accessToken,
      });
      
      navigate("/"); 
    },
    onError: () => {
      message.error("Đăng ký thất bại!");
    },
  });

  return (
    <Form layout="vertical" onFinish={mutate} style={{ maxWidth: 400, margin: "50px auto" }}>
      <Form.Item label="Username" name="username" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name="password" rules={[{ required: true }]}>
        <Input.Password />
      </Form.Item>
      <Button type="primary" htmlType="submit" loading={isPending} block>
        Đăng ký
      </Button>
    </Form>
  );
}