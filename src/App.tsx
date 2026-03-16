
import { Button, Space } from "antd";
import Lab1 from "./lab/lab1";
import Lab2 from "./lab/lab2";
import { Link, Route, Routes } from "react-router-dom";
import Lab3 from "./lab/lab3";
import StoryForm from "./lab/lab4";
import Lab4 from "./lab/lab4";


function App() {

  return (
    
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
          </Space>
        </div>


        <div style={{ border: "1px solid #f0f0f0", padding: "20px", borderRadius: "8px" }}>
          <Routes>
         
            <Route path="/" element={<h2 style={{ textAlign: "center" }}></h2>} />
            
        
            <Route path="/lab1" element={<Lab1 />} />
            <Route path="/lab2" element={<Lab2 />} />
            <Route path="/lab3" element={<Lab3 />} />
            <Route path="/lab4" element={<Lab4 />} />
          </Routes>
        </div>

      </div>
    </>
    
  );
}

export default App;
