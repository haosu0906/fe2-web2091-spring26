
import { Button, Space } from "antd";
import Lab1 from "./lab/lab1";
import Lab2 from "./lab/lab2";
import { Link, Route, Routes } from "react-router-dom";
import Lab3 from "./lab/lab3";
import StoryForm from "./lab/lab4";
import Lab4 from "./lab/lab4";
import StoryList from "./lab/lab5";
import { EditStory } from "./lab/lab6";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";
import { Login } from "./pages/Login";
import { AppHeader } from "./components/Header";
import Register from "./pages/Register";
import AddStory from "./pages/StoryAdd";
import ListStory from "./pages/StoryList";



function App() {

  return (
   <ThemeProvider> 
    <UserProvider>
      <AppHeader/>
    <>
     <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Space size="middle">
            <Link to="/lab1">
              <Button type="primary" size="large"> Lab 1</Button>
            </Link>
            <Link to="/lab2">
              <Button type="primary" size="large"> Lab 2</Button>
            </Link>
            <Link to="/lab3">
              <Button type="primary" size="large"> Lab 3</Button>
            </Link>
            <Link to="/lab4">
              <Button type="primary" size="large"> Lab 4</Button>
            </Link>
            <Link to="/lab5">
              <Button type="primary" size="large"> Lab 5</Button>
            </Link>
            <Link to="/lab6">
              <Button type="primary" size="large"> Lab 6</Button>
            </Link>
            
          </Space>
        </div>


        <div style={{ border: "1px solid #f0f0f0", padding: "20px", borderRadius: "8px" }}>
          <Routes>
         
            <Route path="/" element={<h2 style={{ textAlign: "center" }}></h2>} />
            
        
            <Route path="/lab1" element={<Lab1 />} />
            <Route path="/lab2" element={<Lab2 />} />
            <Route path="/lab3" element={<Lab3 />} />
            <Route path="/lab4" element={<Lab4 />} />
            <Route path="/lab5" element={<StoryList />} />
            <Route path="/edit/:id" element={<EditStory />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/storylist" element={<ListStory />} />
            <Route path="/storyadd" element={<AddStory />} />
          </Routes>

        </div>

      </div>
    </>
    </UserProvider>
    </ThemeProvider>
    
  );
}

export default App;
