// 중앙 통제실 같은 파일??
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {sequelize} = require('./models/index'); 
const router = require('./routes/index');
const db = require('./config/db');
//DB, 서버 등 보안 관련
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 

// DB와 동기화하기
db.authenticate().then((result) => {
    console.log("Connection established!");
}).catch((error) => {
    console.log("unable to connect to db: ", error)
})
db.sync({force:false});
// sequelize.sync().then( 
//     () => console.log('connected to database')
// ).catch(err => console.error('occured error in database connecting', err))

// request body 안의 데이터를 json 형식으로 변환
app.use(express.json());
// router는 routes 디렉토리로 분리해 보기
app.use('/', router);
app.use(cors());
app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", '*');
})
// 서버 포트랑 연결하기
app.listen(process.env.SERVER_PORT, () => {
    console.log('Example app listening on port' + process.env.SERVER_PORT);
})
