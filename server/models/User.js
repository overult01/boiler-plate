const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        time: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function( next ) {
    var user = this;

    //비밀 번호를 암호화 시킨다.
    // 비밀번호가 변경될 때만 암호화를 해준다.
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt){
            if (err) return next(err)
    
            // hash( 비밀번호-- user스키마의 password , 위에서 생성한 salt, function(err, 암호화된 비밀번호인 hash) )
            bcrypt.hash( user.password , salt, function(err, hash) {
                if (err) return next(err)
                user.password = hash
                next()            
            })
        })  
     } else {
        next()
    }    
})

// 왜 함수를 user.js 에 만드는지도 확인 필요

userSchema.methods.comparePassword = function(plainpassword, cb) {
    // 사용자가 로그인시 입력한 pwd (=== plainpassword): 1234567, db에 있는 암호화된 비밀번호 (=== this.password): ~~~~ 가 같은지 확인
    // 따라서 pwd를 암호화하여 db에 있는 비번과 같은지 확인
    bcrypt.compare(plainpassword, this.password, function(err, isMatch){
       if (err) return cb(err);
       cb(null, isMatch)
    })
 }


userSchema.methods.generateToken = function(cb){
    var user = this;
    // jsonwebtoken 을 이용해서 토큰을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token
    user.save(function(err, user) {
        if (err) return cb(err)
        cb(null, user)  // error가 없다면 user정보만 전달
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // user._id + '' = token
    // 토큰을 decode 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디를 이용해서 유저를 찾은 다음에
        // 클라이언트에서 가져온 token 과 DB에 보관된 토큰이 일치하는지 확인

        // findOne은 몽고db에 있는 메소드
        user.findOne({"_id" : decoded, "token": token}, function(err, user) {

            if(err) return cb(err);
            cb(null, user)
        })
    })
}
    




const User = mongoose.model('User', userSchema)

module.exports = { User }