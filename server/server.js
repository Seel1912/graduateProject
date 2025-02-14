import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS configuration for your frontend URL
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST'],
}));

let sensorData = {}; // Biến lưu trữ dữ liệu cảm biến

// Route để nhận dữ liệu từ ESP8266
app.post('/data', (req, res) => {
  console.log('Received data from ESP8266:');
  console.log(req.body);

  sensorData = req.body; // Lưu dữ liệu từ ESP8266 vào biến sensorData

  // Có thể xử lý dữ liệu tại đây nếu cần thiết

  res.send('Data received by server');
});

// Route để frontend có thể lấy dữ liệu sensorData
app.get('/api/sensorData', (req, res) => {
  // Trả về dữ liệu sensorData cho frontend dưới dạng JSON
  res.json(sensorData);
});

// Middleware để xử lý lỗi 404 (Not Found)
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Middleware để xử lý lỗi 500 (Internal Server Error)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('500 Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
