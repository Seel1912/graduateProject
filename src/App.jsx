import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import './index.css';
import { Layout, Menu, notification } from 'antd';
import Dashboard from './Dashboard/Dashboard';
import Doctor from './Doctor/Doctor';
import OldPeople from './Old People/OldPeople';
import OldPeopleDetail from './OldPersonDetail/OldPersonDetail';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Button } from 'antd'; // Import Button from Ant Design
import icon from './assets/icon.png';
const { Header, Sider, Content } = Layout;
import './assets/MonaSans-Regular.ttf';
import io from 'socket.io-client';
import DoctorDetail from './DoctorDetail/DoctorDetail';
import Nurse from './Nurse/Nurse';
import Room from './Room/Room';
import Login from './Login';
import Register from './Register';
const socket = io('http://localhost:3001', {
  transports: ['websocket'],
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
});

const App = () => {
  const [sensorData, setSensorData] = useState({
    sensor1: { temperature: 0, Oxy: 0 },
  });
  const [sensor1Data, setSensor1Data] = useState({ temperature: 0, Oxy: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true'
  );

  useEffect(() => {
    socket.on('sensorData', (data) => {
      setSensorData(data);
    });

    return () => {
      socket.off('sensorData');
    };
  }, []);

  useEffect(() => {
    setSensor1Data(sensorData.sensor1);
  }, [sensorData]);

  useEffect(() => {
    console.log('Updated sensor data:', sensor1Data.Oxy.toFixed(2));
  }, [sensor1Data]);

  let emergencyData = sensorData.sensor1.Oxy.toFixed(2);

  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('');
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleString('vi-VN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  const showNotification = (emergencyData) => {
    notification.error({
      message: 'Alert',
      description: `Bệnh nhân Nguyễn Văn A đang có vấn đề \nNồng độ oxi trong máu: ${emergencyData}`,
      placement: 'topRight',
      duration: 0,
      style: {
        backgroundColor: '#ff4d4f',
        color: '#fff',
      },
    });
  };
  useEffect(() => {
    if (emergencyData < 90) {
      showNotification(emergencyData);
    }
  }, [emergencyData]);
  console.log(emergencyData);
  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
    navigate('/login');
  };

  useEffect(() => {
    localStorage.setItem('lastVisitedRoute', location.pathname);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const lastVisitedRoute = localStorage.getItem('lastVisitedRoute');
    if (lastVisitedRoute) {
      navigate(lastVisitedRoute, { replace: true });
      setSelectedKey(lastVisitedRoute);
    } else {
      navigate('/dashboard', { replace: true });
      setSelectedKey('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="container">
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* <div className="icon" style={{ height: 100, width: '100%' }}>
            <img
              src={icon}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              alt="Biểu tượng"
            />
          </div> */}
          {/* <Sider style={{ background: '#FFFFFF' }}>
            <Menu
              style={{ background: '#FFFFFF', color: '#60A5FA' }}
              mode="inline"
              selectedKeys={[selectedKey]}>
              <Menu.Item key="/dashboard">
                <NavLink to="/dashboard">Bảng điều khiển</NavLink>
              </Menu.Item>
              <Menu.Item key="/doctor">
                <NavLink to="/doctor">Bác sĩ</NavLink>
              </Menu.Item>
              <Menu.Item key="/nurse">
                <NavLink to="/nurse">Điều Dưỡng</NavLink>
              </Menu.Item>
              <Menu.Item key="/oldpeople">
                <NavLink to="/oldpeople">Người cao tuổi</NavLink>
              </Menu.Item>
              <Menu.Item key="/storage">
                <NavLink to="/oldpeople">Quản lý kho</NavLink>
              </Menu.Item>
              <Menu.Item key="/food">
                <NavLink to="/oldpeople">Quản lý thức ăn</NavLink>
              </Menu.Item>
            </Menu>
          </Sider> */}
        </div>
        <Layout>
          <Header style={{ padding: 0, background: '#FFFFFF', height: '70px' }}>
            <div
              style={{
                display: 'flex',
                width: '98%',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '70px',
                margin: '0px 30px',
              }}>
              <p style={{ fontFamily: 'Mona Sans, sans-serif', margin: 0 }}>
                Dữ liệu làm mới lúc {formattedTime}
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Avatar size="large" icon={<UserOutlined />} />
                <p style={{ marginLeft: 10, marginRight: 70 }}>
                  Đặng Huy Hoàng
                </p>
                <Button type="primary" onClick={handleLogout}>
                  Đăng xuất
                </Button>{' '}
                {/* Logout Button */}
              </div>
            </div>
            <div style={{ height: 'auto', background: 'rgb(245, 245, 245)' }}>
              <Menu
                style={{
                  background: '#F5F5F5',
                  color: '#60A5FA',
                  display: 'flex',
                  height: '900px',
                  margin: '10px 10px 0px 10px',
                  width: '98%',
                }}
                mode="inline"
                selectedKeys={[selectedKey]}>
                <Menu.Item
                  className="menu-item"
                  style={{
                    border: '1px solid #60A5FA',
                    backgroundColor: 'white',
                  }}
                  key="/dashboard">
                  <NavLink to="/dashboard">Bảng điều khiển</NavLink>
                </Menu.Item>
                <Menu.Item
                  className="menu-item"
                  style={{
                    border: '1px solid #60A5FA',
                    backgroundColor: 'white',
                  }}
                  key="/doctor">
                  <NavLink to="/doctor">Bác sĩ</NavLink>
                </Menu.Item>
                <Menu.Item
                  className="menu-item"
                  style={{
                    border: '1px solid #60A5FA',
                    backgroundColor: 'white',
                  }}
                  key="/nurse">
                  <NavLink to="/nurse">Điều Dưỡng</NavLink>
                </Menu.Item>
                <Menu.Item
                  className="menu-item"
                  style={{
                    border: '1px solid #60A5FA',
                    backgroundColor: 'white',
                  }}
                  key="/oldpeople">
                  <NavLink to="/oldpeople">Người cao tuổi</NavLink>
                </Menu.Item>
                <Menu.Item
                  className="menu-item"
                  style={{
                    border: '1px solid #60A5FA',
                    backgroundColor: 'white',
                  }}
                  key="/storage">
                  <NavLink to="/oldpeople">Quản lý kho</NavLink>
                </Menu.Item>
                <Menu.Item
                  className="menu-item"
                  style={{
                    border: '1px solid #60A5FA',
                    backgroundColor: 'white',
                  }}
                  key="/room">
                  <NavLink to="/room">Phòng</NavLink>
                </Menu.Item>
                <Menu.Item
                  className="menu-item"
                  style={{
                    border: '1px solid #60A5FA',
                    backgroundColor: 'white',
                  }}
                  key="/food">
                  <NavLink to="/oldpeople">Quản lý thức ăn</NavLink>
                </Menu.Item>
              </Menu>
            </div>
          </Header>
          <Content style={{ marginTop: 50, padding: '0px 30px' }}>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/nurse" element={<Nurse />} />
              <Route path="/room" element={<Room />} />
              <Route path="/doctors/:key" element={<DoctorDetail />} />
              <Route
                path="/oldpeople"
                element={<OldPeople sensor1Data={sensor1Data} />}
              />
              <Route
                path="/oldpeople/:key"
                element={<OldPeopleDetail sensor1Data={sensor1Data} />}
              />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

const AppWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('loggedIn') === 'true'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('loggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={() => setIsLoggedIn(true)} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={isLoggedIn ? <App /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default AppWrapper;
