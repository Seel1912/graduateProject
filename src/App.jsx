import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import './index.css';
import { Layout, Menu } from 'antd';
import Dashboard from './Dashboard/Dashboard';
import Doctor from './Doctor/Doctor';
import OldPeople from './Old People/OldPeople';
import OldPeopleDetail from './OldPersonDetail/OldPersonDetail';
import icon from './assets/icon1.png';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
const { Header, Sider, Content } = Layout;
import './assets/MonaSans-Regular.ttf';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState('');
  const currentTime = new Date();
  const formattedTime = currentTime.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
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
          <div className="icon" style={{ height: 100, width: '100%' }}>
            <img
              style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              src={icon}
              alt="Icon"
            />
          </div>
          <Sider style={{ background: '#FFFFFF' }}>
            <Menu
              style={{ background: '#FFFFFF', color: '#60A5FA' }}
              mode="inline"
              selectedKeys={[selectedKey]}>
              <Menu.Item key="/dashboard">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </Menu.Item>
              <Menu.Item key="/doctor">
                <NavLink to="/doctor">Doctor</NavLink>
              </Menu.Item>
              <Menu.Item key="/oldpeople">
                <NavLink to="/oldpeople">Old People</NavLink>
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
                Data refreshed at {formattedTime}
              </p>
              <div style={{ display: 'flex' }}>
                <p
                  style={{
                    fontFamily: 'Mona Sans, sans-serif',
                    margin: 0,
                    marginRight: 10,
                    fontWeight: 700,
                  }}>
                  Filter Overview
                </p>
                <DownOutlined />
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Avatar size="large" icon={<UserOutlined />} />
                <p style={{ marginLeft: 10, marginRight: 10 }}>
                  Dang Huy Hoang
                </p>
                <DownOutlined />
              </div>
            </div>
          </Header>
          <Content>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/doctor" element={<Doctor />} />
              <Route path="/oldpeople" element={<OldPeople />} />
              <Route path="/oldpeople/:key" element={<OldPeopleDetail />} />
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
      <Route path="*" element={<App />} />
    </Routes>
  </Router>
);

export default AppWrapper;
