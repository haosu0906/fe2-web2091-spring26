import { Form, Input, Button, Checkbox, Select, Spin } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";


interface ICategory {
  id?: string | number;
  title: string;
  description?: string;
  active: boolean;
}

interface IStory {
  id?: string | number;
  title: string;
  author?: string;
  image?: string;
  description?: string;
  categoryId: string | number; 
}


const CategoryForm = () => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: async (data: ICategory) => {
   
      const res = await axios.post("http://localhost:3000/categories", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Thêm danh mục thành công!");
      form.resetFields(); 
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm danh mục");
    },
  });

  const onFinish = (values: ICategory) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ maxWidth: 500, padding: "20px", border: "1px solid #d9d9d9", borderRadius: 8, marginBottom: 40 }}>
      <h2>Bài 1: Thêm Danh Mục Mới</h2>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ active: true }}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Vui lòng nhập title" }]}
        >
          <Input placeholder="Nhập tên danh mục..." />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} placeholder="Nhập mô tả..." />
        </Form.Item>

       
        <Form.Item name="active" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={mutation.isPending}>
          Thêm danh mục
        </Button>
      </Form>
    </div>
  );
};


const StoryForm = () => {
  const [form] = Form.useForm();


  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/categories");
      return res.data;
    },
  });


  const mutation = useMutation({
    mutationFn: async (data: IStory) => {
      const res = await axios.post("http://localhost:3000/stories", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Thêm truyện thành công!");
      form.resetFields();
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm truyện");
    },
  });

  const onFinish = (values: IStory) => {
    mutation.mutate(values);
  };

  return (
    <div style={{ maxWidth: 500, padding: "20px", border: "1px solid #d9d9d9", borderRadius: 8 }}>
      <h2>Bài 4: Thêm Truyện Mới</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên truyện"
          name="title"
          rules={[{ required: true, message: "Nhập tên truyện" }]}
        >
          <Input placeholder="Nhập tên truyện..." />
        </Form.Item>

        <Form.Item label="Tác giả" name="author">
          <Input />
        </Form.Item>
        <Form.Item label="ảnh " name="image">
          <Input />
        </Form.Item>
        <Form.Item label="ngày tạo " name="createdAt">
          <Input />
        </Form.Item>

       
        <Form.Item
          label="Danh mục"
          name="categoryId"
          rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
        >
          <Select
            placeholder="Chọn 1 danh mục"
            loading={isLoadingCategories}
            disabled={isLoadingCategories}
          >
    
            {categories?.map((cat: ICategory) => (
              <Select.Option key={cat.id} value={cat.id}>
                {cat.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="Mô tả" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={mutation.isPending}>
          Thêm truyện
        </Button>
      </Form>
    </div>
  );
};


function Lab4() {
  return (
    <div style={{ padding: "40px", maxWidth: 800, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>Lab 4: React Query - useMutation</h1>
      <CategoryForm />
      <StoryForm />
    </div>
  );
}

export default Lab4;