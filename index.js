const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./config/key')

const { User } = require('./models/User');

//  application/x-www-form-unlencoded
app.use(bodyParser.urlencoded({extended: true}));

// application/json
app.use(bodyParser.json())

app.use(cookieParser())

const mongoose =require('mongoose')
mongoose.connect(config.mongoURI, {
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('노드몬 안녕!!'))

// 회원가입 라우터
app.post('/register', (req, res) => {
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
app.post('/login', (req, res) => {
   // 요청된 이메일이 데이터베이스에 있는지 찾는다
   User.findOne({ email: req.body.email }, (err, userInfo) => {
      // 만약 user콜렉션 안에, 해당 이메일을 가진 유저가 1명도 없다면, userInfo 가 없을 것
      if (!userInfo) {
         return res.json({
            loginSuccess: false,
            message: "제공된 이메일에 해당되는 유저가 없습니다."
         })
      }

   // 요청된 이메일이 데이터베이스에 있다면, 비밀번호도 같은지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
         if(!match)  // match 가 없다는 건, 입력된 비번이 틀렸다는 것
         return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다."})

         // 비밀번호까지 맞다면 토큰을 생성하기 
         user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);

               // 토큰을 저장한다. 어디에 ? 쿠키 or 로컬스토리지 or session 등 다양하게 가능(각기 장단점이 있다)
               // 여기선 쿠키에 저장
               res.cookie("x_auth", user_token)
                  .status(200)
                  .json({ loginSuccess: true, userId: user._id})

         })   
      })

   })

})



app.listen(port, () => console.log(`Example app listening on port ${port}`))