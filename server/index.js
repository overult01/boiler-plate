const express = require('express')
const app = express()

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key')
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

//  application/x-www-form-unlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json());

app.use(cookieParser());

const mongoose =require('mongoose');
const { application, request } = require('express');
mongoose.connect(config.mongoURI, {
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('노드몬 안녕!!'))

// request 받는 라우터 만들기
app.get('/api/hello', (req,res) => {
   // 프론트에 전달할 메세지
   res.send("안녕하세요 ~")
})

// 회원가입 라우터
app.post('/api/users/register', (req, res) => {
   // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
   // 그것들을 데이터 베이스에 넣어준다.
 
   const user = new User(req.body)

   user.save((err, userInfo) => {
      if (err) return res.json({ success: false, err })
      return res.status(200).json({
         success: true
      })
   })
})


// login route 만들기
app.post('/api/users/login', (req, res) => {
   // 요청된 이메일이 데이터베이스에 있는지 찾는다
   User.findOne({ email: req.body.email }, (err, user) => {
      // 만약 user콜렉션 안에, 해당 이메일을 가진 유저가 1명도 없다면, userInfo 가 없을 것
      if (!user) {
         return res.json({
            loginSuccess: false,
            message: "제공된 이메일에 해당되는 유저가 없습니다."
         })
      }

   // 요청된 이메일이 데이터베이스에 있다면, 비밀번호도 같은지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
         if(!isMatch)  // match 가 없다는 건, 입력된 비번이 틀렸다는 것
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

   // 비밀번호까지 맞다면 토큰을 생성하기 
         user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

               // 토큰을 저장한다. 어디에 ? 쿠키 or 로컬스토리지 or session 등 다양하게 가능(각기 장단점이 있다)
               // 여기선 쿠키에 저장
               res.cookie("x_auth", user.token)
                  .status(200)
                  .json({ loginSuccess: true, userId: user._id})

         })   
      })
   })
})


// role 1 : 어드민,      role 2 : 특정 부서 어드민
// role 0 : 일반 유저,    role이 0이 아니면 : 관리자

// Router <- Express 에서 제공되는 기능. (추후 라우터사용하여 api 정리할 것.)

// auth 라는 미들웨어
app.get('/api/users/auth', auth, (req, res) => {

   // 여기까지 미들웨어를 통과해 왔다는 것은: Authentication 이 True라는 말.
   res.status(200).json({
      // 이렇게 정보를 주면 어떤 페이지에서든지, 유저 정보를 사용할 수 있음.
      _id: req.user._id, 
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image
   })
})


// 로그아웃 라우터(로그아웃을 하는 경우는 먼저 로그인된 상태기 때문에 auth미들웨어를 넣어줌)
app.get('/api/users/logout', auth, (req, res) => {
   // 유저를 찾아서 그 데이터들을 업데이트 시켜주는 것.
   User.findOneAndUpdate({ _id: req.user._id},
      { token: "" }  // 로그인시 db에 저장되었던 토큰을 지워주는 것
, (err, user) => {
   if (err) return res.json({ success: false, err})
   return res.status(200).send({
      success: true
      })
   })
})

const port = 5000

app.listen(port, () => console.log(`Example app listening on port ${port}`))