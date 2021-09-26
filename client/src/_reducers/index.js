import { combineReducers } from "redux";
import user from './user_reducer';
// import comment from './comment_reducer';

const rootReducer = combineReducers({
    // 기능이 많아질 수록 늘어남
    user
    // comment
    
})

// export default 로 가져와서 다른 파일으로 내보내기시 다른 이름으로 불러오기가 가능하다.
export default rootReducer;