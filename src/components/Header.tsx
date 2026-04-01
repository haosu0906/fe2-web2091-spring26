import { useContext } from "react";
import { Layout, Button, Avatar, Space, Switch } from "antd";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/ThemeContext";

export function AppHeader() {
  const { user, login, logout } = useContext(UserContext);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <Layout.Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: isDarkMode ? "#141414" : "#fff",
        padding: "0 20px",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <h2 style={{ margin: 0, color: isDarkMode ? "#fff" : "#000" }}>Logo</h2>
      
      <Space size="large">
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren="Tối"
          unCheckedChildren="Sáng"
        />
        
        {user ? (
          <Space>
            <Avatar src={user.avatar} />
            <span style={{ color: isDarkMode ? "#fff" : "#000" }}>{user.name}</span>
            <Button danger onClick={logout}>Logout</Button>
          </Space>
        ) : (
          <Button type="primary" onClick={login}>Login</Button>
        )}
      </Space>
    </Layout.Header>
  );
}