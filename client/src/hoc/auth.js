//import { response } from 'express';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';

export default function (SpecificComponent, option, adminRoute = null) {

    // 옵션의 종류는 세 개
    // null => 아무나 출입이 가능한 페이지
    // true => 로그인한 유저만 출입이 가능한 페이지
    // false => 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props) {
        // eslint-disable-next-line
        const dispatch = useDispatch();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log(response)

                //로그인 하지 않은 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        // 로그인해야하는 사이트(옵션이 true인 사이트)를 접속하려고 할 때 못가게 막아야 함
                        props.history.push('/login') // 로그인 페이지로 이동
                    }
                
                //로그인 한 상태
                } else {
                    
                    if(adminRoute && !response.payload.isAdmin) {
                        props.history.push('/')

                    } else {

                        // 로그인한 유저가 출입 불가능한 페이지를 들어가려고 할 때(로그인페이지, 회원가입 페이지)
                        if(option===false) 
                            props.history.push('/')
                        
                    }
                }
            })
        }, [])

        return (
            <SpecificComponent />
        )


    }
    return AuthenticationCheck
}