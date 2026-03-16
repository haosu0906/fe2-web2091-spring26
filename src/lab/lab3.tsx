import { Form, Input, Button, InputNumber, Select } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

function Lab3() {
  const [postData, setPostData] = useState(null);

  const onFinish3 = (values: any) => {
    console.log("Bài 3 - Thêm Sản Phẩm:", values);
  };

  const onFinish4 = (values: any) => {
    setPostData(values);
  };

  return (
    <>
    <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="#" className="text-xl font-semibold">
            <strong>WEB2091 Lab1</strong>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="lab2" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="Lab3" className="hover:text-gray-200">
              Thêm mới
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            
          </div>
        </div>
      </nav>
    <div style={{ padding: "40px", maxWidth: 500, margin: "0 auto" }}>
      
      <h1>Bài 1</h1>
      <h2>Đăng nhập</h2>
      <Form layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập password" },
            { min: 6, message: "Mật khẩu ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <hr style={{ margin: "40px 0" }} />

      <h1>Bài 2</h1>
      <h2>Đăng ký</h2>
      <Form layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Email không hợp lệ" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập password" },
            { min: 6, message: "Mật khẩu ít nhất 6 ký tự" },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Mật khẩu không khớp!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>

      <hr style={{ margin: "40px 0" }} />

      <h1>Bài 3</h1>
      <h2>Thêm Sản Phẩm Mới</h2>
      <Form layout="vertical" onFinish={onFinish3}>
        <Form.Item
          label="Tên sản phẩm"
          name="productName"
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập giá" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Số lượng"
          name="quantity"
          rules={[{ required: true, message: "Vui lòng nhập số lượng" }]}
        >
          <InputNumber style={{ width: "100%" }} min={1} />
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Thêm sản phẩm
          </Button>
        </Form.Item>
      </Form>

      <hr style={{ margin: "40px 0" }} />

      <h1>Bài 4 (Nâng cao)</h1>
      <h2>Tạo Bài Viết</h2>
      <Form layout="vertical" onFinish={onFinish4}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Vui lòng nhập slug" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select placeholder="Chọn danh mục">
            <Select.Option value="Kinh doanh">Kinh doanh</Select.Option>
            <Select.Option value="Công nghệ">Công nghệ</Select.Option>
            <Select.Option value="Thể thao">Thể thao</Select.Option>
            <Select.Option value="Giải trí">Giải trí</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
        >
          <Input.TextArea rows={5} />
        </Form.Item>

        <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[{ required: true, message: "Vui lòng nhập đường dẫn ảnh" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>

      {postData && (
        <div style={{ marginTop: 20, padding: 20, border: "1px solid #1890ff", borderRadius: 8, backgroundColor: "#e6f7ff" }}>
          <h3 style={{ color: "#1890ff" }}>Dữ liệu hiển thị:</h3>
          <p><strong>Title:</strong> {postData.title}</p>
          <p><strong>Slug:</strong> {postData.slug}</p>
          <p><strong>Category:</strong> {postData.category}</p>
          <p><strong>Content:</strong> {postData.content}</p>
          <p><strong>Image URL:</strong> {postData.imageUrl}</p>
            
          
          {postData.imageUrl && (
            <img src={postData.imageUrl} alt="Preview" style={{ maxWidth: "100%", marginTop: 10, borderRadius: 8 }} />
             
          )}
        </div>
      )}

    </div>
    </>
  );
}

export default Lab3;