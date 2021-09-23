// 유저 모델 가져오기
const { User } = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.x_auth;
 
    // 토큰을 복호화 한 후 유저를 찾는다.
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if(!user) return res.json({ isAuth : false, error: true })
        
        req.token = token;
        req.user = user;
        next(); // 미들웨어에서 index.js 로 갈 수 있게 next() 넣어줌
    })
    
    // 유저가 있으면 인증 Okay

    // 유저가 없으면 인증 No!


}

// 외부에서도 auth 를 사용할 수 있도록
module.exports = {auth};