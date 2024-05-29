import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, notification, Form, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Auth.css';
import logo from './assets/logo.png';
const { Title } = Typography;

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (values) => {
    setLoading(true);
    const userList = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = userList.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );
    if (foundUser) {
      localStorage.setItem('loggedIn', 'true');
      notification.success({
        message: 'Đăng Nhập Thành Công',
        description: 'Chào mừng trở lại!',
        duration: 3,
        style: {
          backgroundColor: '#52c41a',
          color: 'white',
        },
      });
      onLogin();
      navigate('/dashboard');
    } else {
      notification.error({
        message: 'Đăng Nhập Thất Bại',
        description: 'Tên đăng nhập hoặc mật khẩu không đúng!',
        duration: 3,
        style: {
          backgroundColor: '#f5222d',
          color: 'white',
        },
      });
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="Header">
        <div
          style={{
            width: '500px',
            height: '100px',
            position: 'relative',
            left: -330,
            top: 25,
            display: 'flex',
            alignItems: 'center',
          }}>
          <div>
            <img
              style={{ width: '100px', height: '100px' }}
              src={logo}
              alt=""
            />
          </div>
          <div>
            <h4 style={{ marginBottom: '10px', marginTop: '10px' }}>
              Trường Đại Học Sư Phạm Kỹ Thuật Đà Nẵng
            </h4>
            <h4 style={{ marginBottom: '10px', marginTop: '10px' }}>
              Khoa : Điện - Điện Tử
            </h4>
          </div>
        </div>
        <div className="HeaderTitle" style={{ position: 'relative', top: 70 }}>
          <h2 style={{ width: '850px', fontSize: 42 }}>
            Đề Tài : Nghiên Cứu Và Chế tạo Thiết Bị Theo Dõi Sức Khoẻ Dành Cho
            Người Lớn Tuổi Trong Viện Dưỡng Lão
          </h2>
        </div>
        <div className="HeaderContent">
          <h3>Sinh viên thực hiện :</h3>
          <ul style={{ padding: 0 }}>
            <li style={{ fontSize: 18, fontWeight: 'bold' }}>Đặng Huy Hoàng</li>
            <li style={{ fontSize: 18, fontWeight: 'bold' }}>Dương Khánh Vy</li>
            <li style={{ fontSize: 18, fontWeight: 'bold' }}>Nguyễn Đan Hà</li>
          </ul>
        </div>
      </div>
      <div>
        <div style={{ position: 'relative', top: '-250px', right: -600 }}>
          <Form
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleLogin}>
            <Title level={2} className="login-title">
              Đăng Nhập
            </Title>
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Hãy điền tên đăng nhập!' }]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Tên đăng nhập"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Hãy điền mật khẩu!' }]}>
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Mật khẩu"
              />
            </Form.Item>
            <Form.Item>
              <div>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  loading={loading}>
                  Đăng nhập
                </Button>
              </div>
              <div style={{ position: 'relative', right: '-130px' }}>
                <Button
                  type="link"
                  onClick={() => navigate('/register')}
                  style={{ marginTop: '10px' }}>
                  Đăng ký
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
