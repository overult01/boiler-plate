import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setPassword(event.currentTarget.value)
    }    

    const onNameHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setPassword(event.currentTarget.value)
    }    

    const onConfirmPasswordHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setConfirmPassword(event.currentTarget.value)
    }    



    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess) {
                    props.history.push('/')
                } else {
                    alert('Error')
                }
            })
            

    }


    return(
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>

            <form style={{ display: "flex", FlexDirection: "column"}}
                onSubmit = {onSubmitHandler}
            >
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />


                <br />
                <button type="submit">
                    Login
                </button>
            </form>
            
        </div>
    )
}

export default RegisterPage
