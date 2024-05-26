import React, { useState, useEffect } from 'react';
import {
  Space,
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
} from 'antd';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const OldPeople = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingKey, setEditingKey] = useState('');
  const [form] = Form.useForm();
  const [filterOption, setFilterOption] = useState('All');
  const [startDate, setStartDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedData = localStorage.getItem('oldPeopleData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    localStorage.setItem('oldPeopleData', JSON.stringify(newData));
  };

  const handleAdd = () => {
    form.resetFields();
    setEditingKey('');
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    form.setFieldsValue({
      ...record,
      startDate: record.startDate ? moment(record.startDate) : null,
    });
    setEditingKey(record.key);
    setStartDate(record.startDate ? moment(record.startDate) : null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newData = [...data];
      const date = startDate || values.startDate;
      if (editingKey) {
        const index = newData.findIndex((item) => item.key === editingKey);
        newData[index] = { ...values, key: editingKey, startDate: date };
      } else {
        const newKey = newData.length
          ? parseInt(newData[newData.length - 1].key, 10) + 1
          : 1;
        newData.push({
          ...values,
          key: newKey.toString(),
          startDate: date,
        });
      }
      setData(newData);
      setIsModalVisible(false);
      localStorage.setItem('oldPeopleData', JSON.stringify(newData));
    });
  };

  const handleFilterChange = (value) => {
    setFilterOption(value);
    if (value === 'All') {
      setFilteredData([]);
    } else {
      const filtered = data.filter((item) => item.health === value);
      setFilteredData(filtered);
    }
  };

  const handleDatePickerChange = (date) => {
    setStartDate(date);
  };

  const handleNavigateToDetail = (record) => {
    navigate(`/oldpeople/${record.key}`, { state: { record } });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (text, record) => (
        <a onClick={() => handleNavigateToDetail(record)}>{text}</a>
      ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: 100,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 400,
    },
    {
      title: 'Health',
      key: 'health',
      dataIndex: 'health',
      width: 200,
      render: (health) => (
        <Tag color={health === 'Good' ? 'success' : 'volcano'} key={health}>
          {health}
        </Tag>
      ),
    },
    {
      title: 'Room',
      key: 'room',
      dataIndex: 'room',
      width: 200,
    },
    {
      title: 'Start Date',
      key: 'startDate',
      dataIndex: 'startDate',
      render: (startDate) => {
        if (startDate) {
          return moment(startDate).format('YYYY-MM-DD');
        }
        return '';
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record.key)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          margin: '20px 20px 5px 20px',
        }}>
        <Button
          type="primary"
          onClick={handleAdd}
          style={{ marginBottom: 16, marginRight: 16 }}>
          Add Patient
        </Button>
        <Select
          value={filterOption}
          onChange={handleFilterChange}
          style={{ marginBottom: 16, width: 200 }}>
          <Option value="All">Show All</Option>
          <Option value="Good">Filter Good Health</Option>
          <Option value="Not Good">Filter Not Good Health</Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData.length > 0 ? filteredData : data}
      />

      <Modal
        title="Add/Edit Person"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please input the age!' }]}>
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please input the address!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="health"
            label="Health"
            rules={[
              {
                required: true,
                message: 'Please select the health status!',
              },
            ]}>
            <Select>
              <Option value="Good">Good</Option>
              <Option value="Not Good">Not Good</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="room"
            label="Room"
            rules={[{ required: true, message: 'Please input the room!' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[
              { required: true, message: 'Please select the start date!' },
            ]}>
            <DatePicker onChange={handleDatePickerChange} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default OldPeople;
