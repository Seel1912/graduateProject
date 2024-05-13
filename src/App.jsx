import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import './index.css';
import { Layout, Menu } from 'antd';
import Dashboard from './Dashboard/Dashboard';
import Doctor from './Doctor/Doctor';
import OldPeople from './Old People/OldPeople';
import icon from './assets/icon1.png';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
const { Header, Sider, Content } = Layout;
import './assets/MonaSans-Regular.ttf';
function App() {
  return (
    <div className="container">
      <Router>
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
                defaultSelectedKeys={['1']}>
                <Menu.Item key="1">
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                  <NavLink to="/doctor">Doctor</NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                  <NavLink to="/oldpeople">Old People</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
          </div>
          <Layout>
            <Header
              style={{ padding: 0, background: '#FFFFFF', height: '70px' }}>
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  height: '70px',
                }}>
                <p style={{ fontFamily: 'Mona Sans, sans-serif', margin: 0 }}>
                  Data refreshed at May 14/2024 . 12:20 pm
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
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
