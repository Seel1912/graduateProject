import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());

const userSensorData1 = {};
const userSensorData2 = {};
const userSensorData3 = {};
// const userSensorData4 = {};

io.on('connection', (socket) => {
  console.log('A user connected');

  const userId = socket.id;

  const MathTemp = Math.random() * (40 - 35) + 35;
  const OxyTemp = Math.random() * (100 - 90) + 90;

  userSensorData1[userId] = {
    temperature: MathTemp,
    Oxy: OxyTemp,
  };
  userSensorData2[userId] = {
    temperature: MathTemp,
    Oxy: OxyTemp,
  };
  userSensorData3[userId] = {
    temperature: MathTemp,
    Oxy: OxyTemp,
  };
  // userSensorData4[userId] = {
  //   temperature: MathTemp,
  //   Oxy: OxyTemp,
  // };

  socket.emit('sensorData', {
    sensor1: userSensorData1[userId],
    sensor2: userSensorData2[userId],
    sensor3: userSensorData3[userId],
    // sensor4: userSensorData4[userId] 
  });

  setInterval(() => {
    userSensorData1[userId] = {
      temperature: Math.random() * (40 - 35) + 35,
      Oxy: Math.random() * (100 - 90) + 90,
    };
    userSensorData2[userId] = {
      temperature: Math.random() * (40 - 35) + 35,
      Oxy: Math.random() * (100 - 90) + 90,
    };
    userSensorData3[userId] = {
      temperature: Math.random() * (40 - 35) + 35,
      Oxy: Math.random() * (100 - 90) + 90,
    };
    // userSensorData4[userId] = { 
    //   temperature: Math.random() * (42 - 35) + 35,
    //   Oxy: Math.random() * (100 - 90) + 90,
    // };

    socket.emit('sensorData', {
      sensor1: userSensorData1[userId],
      sensor2: userSensorData2[userId],
      sensor3: userSensorData3[userId],
      // sensor4: userSensorData4[userId] 
    });
  }, 5000);

  socket.on('disconnect', () => {
    console.log('User disconnected');
    delete userSensorData1[userId];
    delete userSensorData2[userId];
    delete userSensorData3[userId];
    // delete userSensorData4[userId];
  });
});


const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});