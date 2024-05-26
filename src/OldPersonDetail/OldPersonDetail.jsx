import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Avatar, Space } from 'antd';
import moment from 'moment';

const OldPeopleDetail = () => {
  const location = useLocation();
  const { record } = location.state || {};
  const [hehe, setHehe] = useState({});
  useEffect(() => {
    setHehe(record);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Card title={`Detail of ${hehe.name}`}>
        <Space direction="vertical" size="large">
          {/* <Avatar size={128} src={record.avatar} /> */}
          <div>
            <p>
              <strong>Name:</strong> {hehe.name}
            </p>
            <p>
              <strong>Age:</strong> {hehe.age}
            </p>
            <p>
              <strong>Address:</strong> {hehe.address}
            </p>
            <p>
              <strong>Health:</strong> {hehe.health}
            </p>
            <p>
              <strong>Room:</strong> {hehe.room}
            </p>
            <p>
              <strong>Start Date:</strong>{' '}
              {hehe.startDate
                ? moment(hehe.startDate).format('YYYY-MM-DD')
                : ''}
            </p>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default OldPeopleDetail;
