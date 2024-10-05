import React ,{useState, useEffect}from "react";
import { Layout, Menu, Button , Dropdown,Avatar} from "antd";
import {
  DownOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
// import {jwt_decode} from "jwt-decode";

import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./MainLayout.css";
import FooterComponent from "../Components/Footer/FooterComponent";
import logo from "../assets/images/Engineer_StudyHub_-removebg-preview.png";
// const { default: jwt_decode } = require("jwt-decode");


const { Header, Content } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Path to key mapping
  const pathKeyMap = {
    "/homePage": "1",
    "/learning-material": "2",
    "/JobPortal": "3",
    "/EngineersCarrerHub-DashBoard": "4",
    "/DevelopersHub": "5",
    "/Dashboard": "6",
    "/AboutUs": "7",
    "/ContactUs": "8",
    "/login": "9",
    "/register": "10",
  };

  // Get active key based on the current path
  const activeKey = pathKeyMap[location.pathname] || "1"; // Default to "1" if path doesn't match

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  // Effect to check the token in localStorage when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (token) {
      setIsLoggedIn(true);
      // const decodedToken = jwt_decode(token); 
      // setRole(decodedToken.role)
      setRole("admin"); 
    } else {
      setIsLoggedIn(false);
      setRole(null); 
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setRole(null); // Clear role on logout
    navigate("/login");
  };

  const getMenuItems = () => {
    const baseItems = [
      {
        key: "1",
        label: (
          <Link to="/homePage" className="menu-link">
            <HomeOutlined style={{ fontSize: "22px", marginTop: "10px" }} />
          </Link>
        ),
      },
      {
        key: "2",
        label: (
          <Link to="/learning-material" className="menu-link">
            Engineer’s Library
          </Link>
        ),
      },
      {
        key: "3",
        label: (
          <Link to="/JobPortal" className="menu-link">
            Engineer's CareerHub
          </Link>
        ),
      },
      {
        key: "5",
        label: (
          <Link to="/DevelopersHub" className="menu-link">
            Development Hub
          </Link>
        ),
      },
      {
        key: "7",
        label: (
          <Link to="/AboutUs" className="menu-link">
            About Us
          </Link>
        ),
      },
      {
        key: "8",
        label: (
          <Link to="/ContactUs" className="menu-link">
            Contact Us
          </Link>
        ),
      },
    ];

    // Add extra items based on the role
    if (role === "admin") {
      return [
        ...baseItems,
        {
          key: "4",
          label: (
            <Link to="/company-dashboard" className="menu-link">
              Company Dashboard
            </Link>
          ),
        },
        {
          key: "6",
          label: (
            <Link to="/Dashboard" className="menu-link">
              Admin Dashboard
            </Link>
          ),
        },
      ];
    } else if (role === "company") {
      return [
        ...baseItems,
        {
          key: "4",
          label: (
            <Link to="/company-dashboard" className="menu-link">
              Company Dashboard
            </Link>
          ),
        },
      ];
    }
    // For student and not logged in, return the base items only
    return baseItems; }

  // Profile Dropdown Menu
  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate("/profile")}>
        <UserOutlined /> Profile
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );
  return (
    <Layout style={{ margin: 0, padding: "0px" }}>
      {/* info banner */}
      <div
        style={{ backgroundColor: "#553CDF", width: "100%", height: "45px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "0 20px",
            fontSize: "12px",
            color: "#fff",
            height: "100%",
          }}
        >
          {/* Left section - Contact Info */}
          <div
            style={{
              display: "flex",
              gap: "15px", // Reduced gap for compactness
              alignItems: "center",
              height: "100%",
            }}
          >
            <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
              <MailOutlined
                style={{
                  paddingRight: "5px",
                  fontSize: "18px",
                  color: "#fff",
                  fontWeight: "400",
                  fontStyle: "normal",
                }}
              />
              info@engineerstudyhub.in
            </p>
            <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
              <PhoneOutlined
                style={{
                  paddingRight: "5px",
                  fontSize: "18px",
                  fontWeight: "400",
                  fontStyle: "normal",
                  color: "#fff",
                }}
              />
              +91 9876543210
            </p>
          </div>

          {/* Right section - Country Selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <p style={{ margin: 0, display: "flex", alignItems: "center" }}>
              <DownOutlined style={{ paddingRight: "5px", fontSize: "14px" }} />
              India
            </p>
          </div>
        </div>
      </div>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          width: "100%",
          color: "#6441A3",
          marginRight: 20,
          boxShadow: "0px 5px 5px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          className="logo-container flex"
          style={{ height: "100%", margin: 0 }}
        >
          <img src={logo} alt="logo" style={{ width: "220px" }} />
        </div>

        <Menu
          theme="light"
          mode="horizontal"
          selectedKeys={[activeKey]} // Set active key dynamically
          className="Menu-links"
          // items={items}
          items={getMenuItems()}
          style={{
            flex: 1,
            minWidth: 0,
            backgroundColor: "transparent",
            color: "#fff",
            border: "none",
          }}
        />


           {isLoggedIn ? (
          <Dropdown overlay={profileMenu} trigger={['click']}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} />
              <span style={{ marginLeft: '8px', fontSize: '16px' }}>Profile</span>
            </div>
          </Dropdown>
        ) : (
          <>
        <Button
          onClick={() => navigate("/login")}
          style={{
            padding: "18px 30px",
            borderRadius: "6px",
            color: "#6441A3",
            fontWeight: "bold",
            marginRight: "10px",
            border: "1px solid #6441A3",
            background: "transparent",
          }}
        >
          Login
        </Button>
        <Button
          onClick={() => navigate("/register")}
          style={{
            backgroundColor: "#553CDF",
            padding: "18px 25px",
            borderRadius: "6px",
            color: "#fff",
            border: "none"
          }}
          type="primary"
        >
          Sign Up
        </Button>
        </>
        )}
      </Header>
      <Layout
        style={{
          margin: 0,
          padding: "0px",
        }}
      >
        <Layout style={{ padding: "0" }}>
          <Content
            style={{
              margin: 0,
              minHeight: "100vh",
              borderRadius: 0,
            }}
          >
            {/* Outlet renders the child routes */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
      <FooterComponent />
    </Layout>
  );
};

export default MainLayout;
