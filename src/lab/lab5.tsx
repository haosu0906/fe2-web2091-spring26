import { Table, Image, Spin, Button, Input, Space, message, Popconfirm } from "antd";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const StoryList = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/stories");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string | number) => {
      await axios.delete(`http://localhost:3000/stories/${id}`);
    },
    onSuccess: () => {
      message.success("Xóa truyện thành công!");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
    onError: () => {
      message.error("Có lỗi xảy ra khi xóa truyện!");
    },
  });

  const filteredData = data?.filter((story: any) =>
    story.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (url: string) => <Image src={url} height={60} />,
    },
    {
      title: "Tên truyện",
      dataIndex: "title",
    },
    {
      title: "Tác giả",
      dataIndex: "author",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Danh mục",
      dataIndex: "category", 
      render: (categories: any) => {
        return categories ? categories.title : "Chưa có"; 
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date: string) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      },
    },
    {
      title: "Hành động",
      render: (_: any, record: any) => (
        <Popconfirm
          title="Bạn có chắc chắn muốn xóa truyện này?"
          onConfirm={() => deleteMutation.mutate(record.id)}
          okText="Có, xóa"
          cancelText="Không"
        >
          <Button danger type="primary">
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  if (isLoading) return <Spin />;

  if (isError) return <p>Lỗi khi tải dữ liệu</p>;

  return (
    <Space direction="vertical" style={{ width: "100%", padding: 20 }}>
      <Input.Search
        placeholder="Nhập tên truyện cần tìm..."
        allowClear
        onChange={(e) => setSearchText(e.target.value)}
        style={{ width: 300 }}
      />
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Space>
  );
};

export default StoryList;