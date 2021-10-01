import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';

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


    const onNameHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setName(event.currentTarget.value)
    }    

    const onPasswordHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setPassword(event.currentTarget.value)
    }    

    const onConfirmPasswordHandler = (event) => {
        // setEmail을 이용해서 state를 변경할 수 있음.
        setConfirmPassword(event.currentTarget.value)
    }    

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }


        let body = {
            email: Email,
            password: Password,
            name: Name
        }


        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    props.history.push('/login')
                } else {
                    alert('Failed to sign up')
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
                    Register
                </button>
            </form>
            
        </div>
    )
}

export default withRouter(RegisterPage)