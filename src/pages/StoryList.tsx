import { Table, Image, Button, Popconfirm, Space, Input, Card, Spin } from "antd";
import { Link } from "react-router-dom";

import { useCRUDStory } from "../hooks/useCRUDStory";

const { Search } = Input;

export default function ListStory() {
  
  const { list, isLoading, remove, isDeleting } = useCRUDStory();

  const columns = [
    { title: "ID", dataIndex: "id", width: 60, align: "center" as const },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (url: string) => (
        <Image src={url} width={60} height={80} style={{ objectFit: 'cover', borderRadius: 4 }} fallback="https://via.placeholder.com/60x80" />
      ),
    },
    { title: "Tên truyện", dataIndex: "title", width: 200 },
    { title: "Tác giả", dataIndex: "author" },
    { title: "Mô tả", dataIndex: "description", ellipsis: true },
    { title: "Danh mục", dataIndex: "category", render: (text: string) => text || "Chưa có" },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      render: (date: string) => date ? new Date(date).toLocaleDateString("vi-VN") : "N/A",
    },
    {
      title: "Hành động",
      align: "center" as const,
      render: (_: any, record: any) => (
        <Space direction="vertical" size="small">
          <Link to={`/edit/${record.id}`} style={{ fontWeight: 500 }}>sửa</Link>
          <Popconfirm title="Xóa truyện này?" onConfirm={() => remove(record.id)} okText="Xóa" cancelText="Hủy">
            
            <Button danger size="small" loading={isDeleting}>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card bordered={false} style={{ margin: "20px auto", maxWidth: 1200, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <Search placeholder="Nhập tên truyện cần tìm..." allowClear style={{ width: 300 }} size="large" />
        <Link to="/add">
          <Button type="primary" size="large">Thêm mới</Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div style={{ textAlign: "center", padding: 50 }}><Spin size="large" /></div>
      ) : (
        
        <Table columns={columns} dataSource={list} rowKey="id" pagination={{ pageSize: 5 }} /> 
      )}
    </Card>
  );
}