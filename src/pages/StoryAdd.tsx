import { Form, Input, Button, Card, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { useCRUDStory } from "../hooks/useCRUDStory"; 

export default function AddStory() {
  const { add, isAdding } = useCRUDStory(); 
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const newData = { ...values, createdAt: new Date().toISOString() };
    add(newData, {
      onSuccess: () => {
     
        navigate("/lab5"); 
      }
    });
  };

  return (
    <Card title={<h2 style={{ margin: 0, textAlign: "center" }}>Thêm Truyện Mới</h2>} style={{ maxWidth: 600, margin: "40px auto", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Tên truyện" name="title" rules={[{ required: true, message: "Vui lòng nhập tên truyện!" }]}>
          <Input placeholder="Nhập tên truyện..." size="large" />
        </Form.Item>
        <Form.Item label="Tác giả" name="author"><Input placeholder="Nhập tên tác giả..." size="large" /></Form.Item>
        <Form.Item label="Danh mục" name="category"><Input placeholder="Ví dụ: Hành động, Tình cảm..." size="large" /></Form.Item>
        <Form.Item label="Link Ảnh" name="image"><Input placeholder="https://..." size="large" /></Form.Item>
        <Form.Item label="Mô tả" name="description"><Input.TextArea placeholder="Mô tả ngắn gọn nội dung..." rows={4} /></Form.Item>

        <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
          <Space size="middle">
            <Button type="primary" htmlType="submit" size="large" loading={isAdding} style={{ width: 150 }}>
              Thêm Mới
            </Button>
            <Button size="large" onClick={() => navigate("/lab5")} style={{ width: 100 }}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
}