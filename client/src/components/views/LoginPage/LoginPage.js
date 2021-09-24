import React, { useState } from 'react'

function LoginPage() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onEmailHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setPassword(event.currentTarget.value)
    }    

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

        <form style={{ display: "flex", FlexDirection: "column"}}>
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            <br />
            <button>
                Login
            </button>
        </form>
            

        </div>
    )
}

export default LoginPage
