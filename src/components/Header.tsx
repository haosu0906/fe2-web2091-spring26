import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Button, Space, Avatar, Switch, message } from "antd";
import { useAuthStore } from "../stores/useAuthStores";

import { ThemeContext } from "../context/ThemeContext"; 

export function AppHeader() {
  
  const { user, setUser } = useAuthStore();
  
 
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    message.success("Đăng xuất thành công");
    navigate("/login");
  };

  
  const headerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    
    background: isDarkMode ? "#141414" : "#fff", 
    padding: "0 20px",
    borderBottom: `1px solid ${isDarkMode ? "#303030" : "#f0f0f0"}`,
    color: isDarkMode ? "#fff" : "#000",
    height: 64,
  };

  return (
    <Layout.Header style={headerStyle}>
      <Link to="/">
        <h2 style={{ margin: 0, color: isDarkMode ? "#fff" : "#000" }}>WEB2091 App</h2>
      </Link>

      <Space size="large">
      
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren="Tối"
          unCheckedChildren="Sáng"
        />

        {user ? (
          <Space size="middle">
          
            <Avatar src={user.avatar} style={{ backgroundColor: isDarkMode ? '#177ddc' : '#1890ff' }} />
            
           
            <span style={{ color: isDarkMode ? "#fff" : "#000" }}>
              Hi, <strong>{user.email}</strong>
            </span>
            
         
            <Button danger onClick={handleLogout}>Logout</Button>
          </Space>
        ) : (
          <Space size="middle">
            <span style={{ color: isDarkMode ? "#fff" : "#000" }}>Chưa đăng nhập</span>
            <Link to="/login"><Button>Login</Button></Link>
            <Link to="/register"><Button type="primary">Register</Button></Link>
          </Space>
        )}
      </Space>
    </Layout.Header>
  );
}