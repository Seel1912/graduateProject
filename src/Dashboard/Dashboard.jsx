import { Select } from 'antd';
import {
  UserOutlined,
  RiseOutlined,
  ClockCircleOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import React, { useEffect } from 'react';
const NursingHomeAgeChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById('nursingHomeAgeChart');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Statistics on the age',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 5, name: '<50 Age' },
            { value: 15, name: '50-60 Age' },
            { value: 12, name: '60-70 Age' },
            { value: 23, name: '70-80 Age' },
            { value: 10, name: '80-90 Age' },
          ],
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
      myChart.dispose(); // Cleanup chart when component unmounts
    };
  }, []);

  return (
    <div
      id="nursingHomeAgeChart"
      style={{ width: '100%', height: '400px' }}></div>
  );
};
const option = {
  title: {
    text: 'Patients Count by Month',
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    data: ['In-patients', 'Out-patients'],
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
      'November',
      'December',
      'January',
      'February',
      'March',
      'April ',
      'May ',
    ],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      name: 'In-patients',
      type: 'line',
      stack: 'Total',
      data: [28, 22, 17, 18, 8, 14, 37],
    },
    {
      name: 'Out-patients',
      type: 'line',
      stack: 'Total',
      data: [12, 7, 4, 7, 3, 4, 18],
    },
  ],
};
const ChartComponent = () => {
  return <ReactECharts option={option} style={{ height: '400px' }} />;
};
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const Dashboard = () => {
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
          <p style={{ fontWeight: 700, color: '#3D3D4E' }}>Nursing Home</p>
          <Select
            defaultValue="Da Nang"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'Da Nang',
                label: 'Da Nang',
              },
              {
                value: 'Ha Noi',
                label: 'Ha Noi',
              },
              {
                value: 'disabled',
                label: 'Disabled',
                disabled: true,
              },
            ]}
          />
        </div>
        <div className="header-option1">
          <p style={{ fontWeight: 700, color: '#3D3D4E' }}>Doctors</p>
          <Select
            defaultValue="All"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'Da Nang',
                label: 'Da Nang',
              },
              {
                value: 'Ha Noi',
                label: 'Ha Noi',
              },
              {
                value: 'disabled',
                label: 'Disabled',
                disabled: true,
              },
            ]}
          />
        </div>
        <div className="header-option1">
          <p style={{ fontWeight: 700, color: '#3D3D4E' }}>Special case</p>
          <Select
            defaultValue="All"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'Da Nang',
                label: 'Da Nang',
              },
              {
                value: 'Ha Noi',
                label: 'Ha Noi',
              },
              {
                value: 'disabled',
                label: 'Disabled',
                disabled: true,
              },
            ]}
          />
        </div>
        <div className="header-option1">
          <p style={{ fontWeight: 700, color: '#3D3D4E' }}>Month</p>
          <Select
            defaultValue="All"
            style={{
              width: 200,
            }}
            onChange={handleChange}
            options={[
              {
                value: 'Da Nang',
                label: 'Da Nang',
              },
              {
                value: 'Ha Noi',
                label: 'Ha Noi',
              },
              {
                value: 'disabled',
                label: 'Disabled',
                disabled: true,
              },
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
        }}>
        <div
          className="card--item"
          style={{
            width: '228px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}>
          <div
            className="card-title"
            style={{ display: 'flex', marginTop: '-10px' }}>
            <UserOutlined style={{ fontSize: '24px' }} />
            <p
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'rgb(61, 61, 78)',
                marginLeft: 20,
              }}>
              Doctor
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
              10
            </p>
            <div className="increase" style={{ display: 'flex' }}>
              <RiseOutlined
                style={{ fontSize: '16px', color: 'red', marginRight: 10 }}
              />
              <span style={{ color: 'red' }}>2.5</span>
            </div>
          </div>
        </div>
        <div
          className="card--item"
          style={{
            width: '228px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}>
          <div
            className="card-title"
            style={{ display: 'flex', marginTop: '-10px' }}>
            <UserAddOutlined style={{ fontSize: '24px' }} />
            <p
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'rgb(61, 61, 78)',
                marginLeft: 20,
              }}>
              Patients
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
              220
            </p>
            <div className="increase" style={{ display: 'flex' }}>
              <RiseOutlined
                style={{ fontSize: '16px', color: 'red', marginRight: 10 }}
              />
              <span style={{ color: 'red' }}>5.2</span>
            </div>
          </div>
        </div>
        <div
          className="card--item"
          style={{
            width: '228px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}>
          <div
            className="card-title"
            style={{ display: 'flex', marginTop: '-10px' }}>
            <ClockCircleOutlined style={{ fontSize: '24px' }} />
            <p
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'rgb(61, 61, 78)',
                marginLeft: 20,
              }}>
              Avg. Length
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
              12 months
            </p>
            <div className="increase" style={{ display: 'flex' }}>
              <RiseOutlined
                style={{ fontSize: '16px', color: 'red', marginRight: 10 }}
              />
              <span style={{ color: 'red' }}>1.2</span>
            </div>
          </div>
        </div>
        <div
          className="card--item"
          style={{
            width: '228px',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
          }}>
          <div
            className="card-title"
            style={{ display: 'flex', marginTop: '-10px' }}>
            <UserOutlined style={{ fontSize: '24px' }} />
            <p
              style={{
                fontSize: '18px',
                fontWeight: 700,
                color: 'rgb(61, 61, 78)',
                marginLeft: 20,
              }}>
              Admitted Paitents
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
              20
            </p>
            <div className="increase" style={{ display: 'flex' }}>
              <RiseOutlined
                style={{ fontSize: '16px', color: 'red', marginRight: 10 }}
              />
              <span style={{ color: 'red' }}>3.8</span>
            </div>
          </div>
        </div>
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
          <ChartComponent />
        </div>
        <div
          style={{
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: 'white',
            width: '47.5%',
            marginLeft: '20px',
          }}>
          <NursingHomeAgeChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
