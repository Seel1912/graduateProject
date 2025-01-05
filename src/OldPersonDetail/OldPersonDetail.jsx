import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Space, Image } from 'antd';
import moment from 'moment';
import ReactEcharts from 'echarts-for-react';
import image1 from '.././assets/unnamed.jpg';
import image2 from '.././assets/Untitled.png';
import axios from 'axios';

const HeartRateChart = ({ data, avgHeartRate }) => {
  const getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.date),
      },
      yAxis: {
        type: 'value',
        name: 'Heart Rate',
        min: 0,
        max: 200,
        interval: 20,
        axisLabel: {
          formatter: '{value} bpm',
        },
      },
      series: [
        {
          name: 'Heart Rate',
          type: 'line',
          data: data.map((item) => item.heartRate),
        },
        // Đường gạch ngang hiển thị giá trị trung bình
        {
          name: 'Average Heart Rate',
          type: 'line',
          markLine: {
            data: [{ yAxis: avgHeartRate, name: 'Average Heart Rate' }],
          },
        },
      ],
    };
  };

  return (
    <ReactEcharts
      option={getOption()}
      style={{ height: '300px', width: '100%' }}
      className="react_for_echarts"
    />
  );
};

const OxygenLevelChart = ({ data, avgOxygenLevel }) => {
  const getOption = () => {
    return {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.date),
      },
      yAxis: {
        type: 'value',
        name: 'Oxygen Level',
        min: 0,
        max: 100,
        interval: 10,
        axisLabel: {
          formatter: '{value}%',
        },
      },
      series: [
        {
          name: 'Oxygen Level',
          type: 'line',
          data: data.map((item) => item.oxygenLevel),
        },
        {
          name: 'Average Oxygen Level',
          type: 'line',
          markLine: {
            data: [{ yAxis: avgOxygenLevel, name: 'Average Oxygen Level' }],
          },
        },
      ],
    };
  };

  return (
    <ReactEcharts
      option={getOption()}
      style={{ height: '300px', width: '100%' }}
      className="react_for_echarts"
    />
  );
};

const OldPeopleDetail = ({ sensor1Data }) => {
  console.log(sensor1Data, 'kakakak');
  const location = useLocation();
  const [sensorData, setSensorData] = useState({});

  const { record } = location.state || {};
  const [hehe, setHehe] = useState({});
  const data = [
    { date: '2 tiếng trước', heartRate: 78.64, oxygenLevel: 96 },
    { date: '1 giờ 50 phút trước', heartRate: 77, oxygenLevel: 97 },
    { date: '1 giờ 40 phút trước', heartRate: 78, oxygenLevel: 96 },
    { date: '1 giờ 30 phút trước', heartRate: 76, oxygenLevel: 97 },
    { date: '1 giờ 20 phút trước', heartRate: 80, oxygenLevel: 97 },
    { date: '1 giờ 10 phút trước', heartRate: 90.47, oxygenLevel: 96 },
    { date: '1 giờ trước', heartRate: 93.28, oxygenLevel: 97 },
    { date: '50 phút trước', heartRate: 81, oxygenLevel: 97 },
    { date: '40 phút trước', heartRate: 93.31, oxygenLevel: 96 },
    { date: '30 phút trước', heartRate: 91.76, oxygenLevel: 97 },
    { date: '20 phút trước', heartRate: 84.88, oxygenLevel: 98 },
    { date: '10 phút trước', heartRate: 75, oxygenLevel: 97 },
    { date: '5 phút trước', heartRate: 74, oxygenLevel: 98 },
    { date: '2 phút trước', heartRate: 78.5, oxygenLevel: 97 },
    { date: '1 phút trước', heartRate: 78.2, oxygenLevel: 96 },
  ];

  console.log(hehe);
  const [avgHeartRate, setAvgHeartRate] = useState(0);
  const [avgOxygenLevel, setAvgOxygenLevel] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/sensorData'
        );
        setSensorData(response.data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000); // Fetch data every 1 second

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);
  console.log(sensorData);
  useEffect(() => {
    const heartRates = data.map((item) => item.heartRate);
    const oxygenLevels = data.map((item) => item.oxygenLevel);
    const avgHR =
      heartRates.reduce((acc, curr) => acc + curr, 0) / heartRates.length;
    const avgOL =
      oxygenLevels.reduce((acc, curr) => acc + curr, 0) / oxygenLevels.length;
    setAvgHeartRate(avgHR);
    setAvgOxygenLevel(avgOL);
    setHehe(record);
  }, []);
  return (
    <div
      style={{
        padding: '20px',
        // display: 'grid',
        // gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}>
      <Card
        title={`Thông tin chi tiết của ${hehe.name}`}
        style={{ width: 700 }}>
        <Space direction="vertical" size="large">
          {
            <Image
              width={100}
              src={hehe.health == 'Không tốt' ? image1 : image2}
            />
          }
          <div>
            <p>
              <strong>Tên người cao tuổi:</strong> {hehe.name}
            </p>
            <p>
              <strong>Tuổi:</strong> {hehe.age}
            </p>
            <p>
              <strong>Địa chỉ nhà:</strong> {hehe.address}
            </p>
            <p style={{ color: hehe.health === 'Không tốt' ? 'red' : 'green' }}>
              <strong>Hiện trạng sức khỏe:</strong> {hehe.health}
            </p>
            <p>
              <strong>Phòng:</strong> {hehe.room}
            </p>
            <p>
              <strong>Quê quán:</strong> {hehe.hometown}
            </p>
            <p>
              <strong>Bệnh nền:</strong> {hehe.medicalHistory}
            </p>
            <p>
              <strong>Số điện thoại của người thân: +84</strong>{' '}
              {hehe.phoneNumber}
            </p>
            <p>
              <strong>Người chăm sóc:</strong> {hehe.nurse}
            </p>
            {hehe.sensor === 'sensordata1' && (
              <div>
                <p
                  style={{
                    color: sensorData.SpO2 < 90 ? 'red' : 'green',
                  }}>
                  <strong>Nồng độ oxi trong máu hiện tại: 94 SpO2</strong>
                </p>
                <p
                  style={{
                    color:
                      sensorData.Bpm < 60 || sensorData.Bpm > 100
                        ? 'red'
                        : 'green',
                  }}>
                  <strong>Nhịp tim hiện tại: 81.90 BPM</strong>
                </p>
              </div>
            )}
            <p>
              <strong>Ngày vào viện:</strong>{' '}
              {hehe.startDate
                ? moment(hehe.startDate).format('YYYY-MM-DD')
                : ''}
            </p>
          </div>
        </Space>
      </Card>

      {hehe.health == 'Không tốt' && (
        <Card className="Haha" style={{ width: 700 }}>
          <div>
            <h2>Biểu đồ nhịp tim trong 2 giờ</h2>
            <HeartRateChart data={data} avgHeartRate={avgHeartRate} />
          </div>
          <div>
            <h2>Biểu đồ nồng độ oxy trong máu trong 2 giờ</h2>
            <OxygenLevelChart data={data} avgOxygenLevel={avgOxygenLevel} />
          </div>
        </Card>
      )}
    </div>
  );
};

export default OldPeopleDetail;
