import React,{useEffect} from 'react'
import axios from 'axios';

function LandingPage() {
    // 랜딩페이지에 들어오자마자, 아래를 실행
    useEffect(() => {
        axios.get('/api/hello')
         .then(response => console.log(response.data))   // 서버에서 전달받은 response를 콘솔창에 뿌림
    }, [])

    return (
        <div>
            LandingPage 랜딩페이지
        </div>
    )
}

export default LandingPage