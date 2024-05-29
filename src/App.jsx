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
import { Avatar } from 'antd';
import icon from './assets/icon.png';
const { Header, Sider, Content } = Layout;
import './assets/MonaSans-Regular.ttf';
import io from 'socket.io-client';
import DoctorDetail from './DoctorDetail/DoctorDetail';
import Nurse from './Nurse/Nurse';

const socket = io('http://localhost:3001', {
  transports: ['websocket'],
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] },
});

const App = () => {
  const [sensorData, setSensorData] = useState({
    sensor1: { temperature: 0, Oxy: 0 },
  });
  const [sensor1Data, setSensor1Data] = useState({ temperature: 0, Oxy: 0 });

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
      description: `Bệnh nhân Nguyễn Văn A đang có vấn đề về tim\nNhịp tim hiện tại: ${emergencyData}`,
      placement: 'topRight',
      duration: 0,
      style: {
        backgroundColor: '#ff4d4f',
        color: '#fff',
      },
    });
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

  // useEffect(() => {
  //   if (emergencyData < 93) {
  //     showNotification(emergencyData);
  //   }
  // }, [emergencyData]);

  return (
    <div className="container">
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="icon" style={{ height: 100, width: '100%' }}>
            <img
              src={icon}
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              alt="Biểu tượng"
            />
          </div>
          <Sider style={{ background: '#FFFFFF' }}>
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
          </Sider>
        </div>
        <Layout>
          <Header style={{ padding: 0, background: '#FFFFFF', height: '70px' }}>
            <div
              style={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '70px',
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
                <p style={{ marginLeft: 10, marginRight: 10 }}>
                  Đặng Huy Hoàng
                </p>
                <DownOutlined />
              </div>
            </div>
          </Header>
          <Content>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/nurse" element={<Nurse />} />
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

const AppWrapper = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<App />} />
    </Routes>
  </Router>
);

export default AppWrapper;
