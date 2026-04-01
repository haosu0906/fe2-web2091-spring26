import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "../stores/useAuthStores"
import axios from "axios";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

 export const Login = () =>{
    const navigate = useNavigate();
    const {setUser} = useAuthStore();
    const {mutate, isPending} = useMutation({
        mutationFn: async(values: any) =>{
            return await axios.post("http://localhost:3000/login", values);
        },
        onSuccess: ({data}) =>{
            setUser({
                email: data.user.email,
                name: "user mới",
                token: data.accessToken,
            });
            message.success("đăng nhập thành công");
            navigate("/")
        },
        onError: () =>{
            message.error("email hoặc mật khẩu không đúng ");
        },
    });
    const onFinish = (values: any) =>{
        mutate(values);
    };

    return (
        <Form 
        layout="vertical"
        onFinish={onFinish}
        style={{maxWidth:400, margin: "50px auto"}}
        >
        <Form.Item
        label="email"
        name="email"
        rules={[{required: true, message:"nhập email "}]}
        >
            <Input  />

        </Form.Item>
        <Form.Item
        label="password"
        name="password"
        rules={[{required: true, message:"nhập password "}]}
        >
            <Input.Password  />
        </Form.Item>
        <Form.Item>
            <Button type="primary" htmlType="submit" loading={isPending} block>
                đăng nhập 
            </Button>
        </Form.Item>
        </Form>
    )
}
export default Login;