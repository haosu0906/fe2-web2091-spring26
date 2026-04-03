import { Form, Input, Button, Card, Space, Spin } from "antd";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCRUDStory } from "../hooks/useCRUDStory"; // IMPORT HOOK GỘP

export default function EditStory() {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  
  
  const { update, isUpdating, list, isLoading } = useCRUDStory(); 

 
  useEffect(() => {
    if (list) {
      const currentStory = list.find((s: any) => String(s.id) === String(id));
      if (currentStory) form.setFieldsValue(currentStory);
    }
  }, [list, id, form]);

  const onFinish = (values: any) => {
    update({ id, ...values }, {
      onSuccess: () => navigate("/lab5")
    });
  };

  if (isLoading) return <div style={{ textAlign: "center", marginTop: 50 }}><Spin size="large" /></div>;

  return (
    <Card title={<h2 style={{ margin: 0, textAlign: "center" }}>Chỉnh Sửa Truyện</h2>} style={{ maxWidth: 600, margin: "40px auto", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Tên truyện" name="title" rules={[{ required: true, message: "Vui lòng nhập tên truyện!" }]}>
          <Input placeholder="Nhập tên truyện..." size="large" />
        </Form.Item>
        <Form.Item label="Tác giả" name="author"><Input placeholder="Nhập tên tác giả..." size="large" /></Form.Item>
        <Form.Item label="Danh mục" name="category"><Input placeholder="Ví dụ: Hành động, Tình cảm..." size="large" /></Form.Item>
        <Form.Item label="Link Ảnh" name="image"><Input placeholder="https://..." size="large" /></Form.Item>
        <Form.Item label="Mô tả" name="description"><Input.TextArea placeholder="Mô tả ngắn gọn nội dung..." rows={4} /></Form.Item>

        <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
          <Space size="middle">
            <Button type="primary" htmlType="submit" size="large" loading={isUpdating} style={{ width: 150 }}>
              Lưu Thay Đổi
            </Button>
            <Button size="large" onClick={() => navigate("/lab5")} style={{ width: 100 }}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}