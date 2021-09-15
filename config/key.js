if(process.env.NODE_ENV === 'production') {
    module.exports = require('./prod'); // 배포(Deploy)인 경우
} else {
    module.exports = require('./dev'); // 로컬 환경인 경우
}