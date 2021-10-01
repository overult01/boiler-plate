import React,{useEffect} from 'react'
import axios from 'axios';
//import { response } from 'express';
import { withRouter } from 'react-router-dom';

function LandingPage(props) {
    // 랜딩페이지에 들어오자마자, 아래를 실행
    useEffect(() => {
        axios.get('/api/hello')
         .then(response => console.log(response.data))   // 서버에서 전달받은 response를 콘솔창에 뿌림
    }, [])

    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success) {
                props.history.push("/login")  // history 가 react-router-dom 을 활용해서 쓰는 거라, withRouter를 사용해야 history.push 를 사용할 수 있다
            } else {
                alert("로그아웃 실패하였습니다.")
            }
        })
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler}>
                로그아웃
            </button>
        </div>
    )
}

export default withRouter(LandingPage)