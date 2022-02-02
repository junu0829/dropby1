// 중앙 통제실 같은 파일??
const express = require('express');
const app = express();
const sequelize = require('./models/index'); 
const router = require('./routes/index');
//DB, 서버 등 보안 관련
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 

const ConnectDB = async () => {
    try {
        await sequelize.authenticate().then( 
            () => console.log('데이터베이스 연결 성공!')
        );
        await sequelize.sync().then(
            () => console.log('동기화 완료!')
        );
    } catch (error) {
        console.error('DB 연결 및 동기화 실패', error);
    }
}
// DB와 연결 및 동기화
ConnectDB();

// request body 안의 데이터를 json 형식으로 변환
app.use(express.json());

// router는 routes 디렉토리로 분리해 보기
app.use('/', router);

// 다른 도메인에서 온 요청도 허용함.
app.use(cors());
app.use((req, res) => {
    res.header("Access-Control-Allow-Origin", '*');
})

// 서버 포트랑 연결하기
app.listen(process.env.SERVER_PORT, () => {
    console.log(process.env.SERVER_PORT + '번 포트에 연결되었습니다!');
})
