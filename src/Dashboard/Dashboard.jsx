import { Select } from 'antd';
import {
  UserOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';

const NursingHomeAgeChart = ({ dataAge }) => {
  const [ageCounts, setAgeCounts] = useState({
    '<50 tuổi': 0,
    '50-60 tuổi': 0,
    '60-70 tuổi': 0,
    '70-80 tuổi': 0,
    '80-90 tuổi': 0,
  });

  useEffect(() => {
    const newAgeCounts = {
      '<50 tuổi': 0,
      '50-60 tuổi': 0,
      '60-70 tuổi': 0,
      '70-80 tuổi': 0,
      '80-90 tuổi': 0,
    };

    dataAge.forEach((person) => {
      if (person.age < 50) {
        newAgeCounts['<50 tuổi']++;
      } else if (person.age >= 50 && person.age < 60) {
        newAgeCounts['50-60 tuổi']++;
      } else if (person.age >= 60 && person.age < 70) {
        newAgeCounts['60-70 tuổi']++;
      } else if (person.age >= 70 && person.age < 80) {
        newAgeCounts['70-80 tuổi']++;
      } else if (person.age >= 80 && person.age < 90) {
        newAgeCounts['80-90 tuổi']++;
      }
    });

    setAgeCounts(newAgeCounts);
  }, [dataAge]);

  useEffect(() => {
    const chartDom = document.getElementById('nursingHomeAgeChart');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Thống kê độ tuổi',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'right',
      },
      series: [
        {
          name: 'Phân loại',
          type: 'pie',
          radius: '50%',
          data: Object.entries(ageCounts).map(([name, value]) => ({
            value,
            name,
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose(); // Dọn dẹp biểu đồ khi component unmount
    };
  }, [ageCounts]);

  return (
    <div
      id="nursingHomeAgeChart"
      style={{ width: '100%', height: '400px' }}></div>
  );
};

const ChartComponent = ({ data }) => {
  const [chartData, setChartData] = useState();

  useEffect(() => {
    if (data && data.length > 0) {
      const Boarding = data.map((item) => item.Boarding);
      const outpatient = data.map((item) => item.outpatient);
      setChartData({ Boarding, outpatient });
    } else {
      // Nếu không có dữ liệu mới, sử dụng dữ liệu mặc định
      setChartData({
        Boarding: [1, 2, 1, 2, 1, 2, 4],
        outpatient: [1, 2, 1, 3, 7, 4, 5],
      });
    }
  }, [data]);

  if (!chartData) {
    return <div>Loading...</div>;
  }

  const option = {
    title: {
      text: 'Số lượng Người cao tuổi theo tháng',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: ['Người cao tuổi đến', 'Người cao tuổi rời đi'],
      right: 20, // Cấu hình vị trí của legend bên phải
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: [
        'Tháng 11',
        'Tháng 12',
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
      ],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Người cao tuổi nội trú',
        type: 'line',
        stack: 'Tổng cộng nội trú',
        data: chartData.Boarding,
      },
      {
        name: 'Người cao tuổi ngoại trú',
        type: 'line',
        stack: 'Tổng cộng ngoại trú',
        data: chartData.outpatient,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: '400px' }} />;
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const CardItem = ({ icon, title, value, increase }) => (
  <div
    className="card--item"
    style={{
      width: '228px',
      padding: '10px',
      borderRadius: '10px',
      backgroundColor: 'white',
    }}>
    <div className="card-title" style={{ display: 'flex', marginTop: '-10px' }}>
      {icon}
      <p
        style={{
          fontSize: '18px',
          fontWeight: 700,
          color: 'rgb(61, 61, 78)',
          marginLeft: 20,
        }}>
        {title}
      </p>
    </div>
    <div
      className="card-content"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
      }}>
      <p
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: 'rgb(61, 61, 78)',
        }}>
        {value}
      </p>
      <div className="increase" style={{ display: 'flex' }}>
        <RiseOutlined
          style={{ fontSize: '16px', color: 'green', marginRight: 10 }}
        />
        <span style={{ color: 'green' }}>{increase}</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [filterDoctorInRoom, setFilterDoctorInRoom] = useState(0);
  const [filterOldPeopleInRoom, setFilterOldPeopleInroom] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState('Tất cả');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const savedData = localStorage.getItem('oldPeopleData');
    const savedDataDoctor = localStorage.getItem('doctorsData');
    if (savedData) {
      setData(JSON.parse(savedData));
      setDoctor(JSON.parse(savedDataDoctor));
    }
  }, []);

  const handleRoomChange = (value) => {
    setSelectedRoom(value);
  };

  useEffect(() => {
    const filteredOldPeople = data.filter(
      (person) => selectedRoom === 'Tất cả' || person.room === selectedRoom
    );
    const filteredDoctors = doctor.filter(
      (doc) => selectedRoom === 'Tất cả' || doc.room === selectedRoom
    );
    setFilterDoctorInRoom(filteredDoctors.length);
    setFilterOldPeopleInroom(filteredOldPeople.length);
    setFilteredData(filteredOldPeople);
  }, [selectedRoom, data, doctor]);

  return (
    <div className="container--dashboard">
      <div
        className="header--dashboard"
        style={{
          padding: '10px',
          borderRadius: '10px',
          backgroundColor: 'white',
          margin: '15px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <div className="header-option1">
          <p style={{ fontWeight: 700, color: '#3D3D4E' }}>Nhà dưỡng lão</p>
          <Select
            defaultValue="Đà Nẵng"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'Đà Nẵng',
                label: 'Đà Nẵng',
              },
            ]}
          />
        </div>
        <div className="header-option1">
          <p style={{ fontWeight: 700, color: '#3D3D4E' }}>Phòng</p>
          <Select
            defaultValue="Tất cả"
            style={{
              width: 200,
            }}
            onChange={handleRoomChange}
            options={[
              { value: 'Tất cả', label: 'Tất cả' },
              { value: 'A1', label: 'A1' },
              { value: 'A2', label: 'A2' },
              { value: 'A3', label: 'A3' },
              { value: 'A4', label: 'A4' },
              { value: 'A5', label: 'A5' },
              { value: 'B1', label: 'B1' },
              { value: 'B2', label: 'B2' },
              { value: 'B3', label: 'B3' },
              { value: 'B4', label: 'B4' },
              { value: 'B5', label: 'B5' },
              { value: 'C1', label: 'C1' },
              { value: 'C2', label: 'C2' },
              { value: 'C3', label: 'C3' },
              { value: 'C4', label: 'C4' },
              { value: 'C5', label: 'C5' },
            ]}
          />
        </div>
      </div>
      <div
        className="card--dashboard"
        style={{
          margin: '15px',
          gap: '20px',
          width: '99%',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
        <CardItem
          icon={<UserOutlined style={{ fontSize: '24px' }} />}
          title="Bác sĩ"
          value={filterDoctorInRoom}
          increase="2.5"
        />
        <CardItem
          icon={<UserAddOutlined style={{ fontSize: '24px' }} />}
          title="Người cao tuổi"
          value={filterOldPeopleInRoom}
          increase="5.2"
        />
        <CardItem
          icon={<ClockCircleOutlined style={{ fontSize: '24px' }} />}
          title="Thời gian trung bình"
          value="12 tháng"
          increase="1.2"
        />
        <CardItem
          icon={<UserOutlined style={{ fontSize: '24px' }} />}
          title="Người cao tuổi xuất viện"
          value="20"
          increase="3.8"
        />
      </div>
      <div className="footer--dashboard" style={{ display: 'flex' }}>
        <div
          style={{
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
            width: '47.5%',
            marginLeft: '15px',
          }}>
          <ChartComponent data={filteredData} />
        </div>
        <div
          style={{
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
            width: '47.5%',
            marginLeft: '20px',
          }}>
          <NursingHomeAgeChart dataAge={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
