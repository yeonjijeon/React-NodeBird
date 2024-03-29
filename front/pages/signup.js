import AppLayout from "../components/AppLayout";
import Head from 'next/Head'
import { Form, Input, Checkbox, Button } from 'antd'
import { useCallback, useState } from "react";
import useInput from "../hooks/useInput";
import styled from 'styled-components'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";

const SignUp = () => {
    
    const dispatch = useDispatch()
    const { signUpLoading } = useSelector( (state) => state.user )

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('')
    const [passwordError, setPasswordError] = useState(false)

    const onChangePasswordCheck = useCallback( (e) => {
        setPasswordCheck(e.target.value)
        setPasswordError(e.target.value !== password)
    }, [password])

    const [term, setTerm] = useState('')
    const [termError, setTermError] = useState(false)
    const onChangeTerm = useCallback( (e) => {
        setTerm(e.target.checked)
        setTermError(false)
    }, [])

    
    const ErrorMessage = styled.div`
        color: red
    `

    const onSubmit = useCallback( () => {
        if (password != passwordCheck) {
            return setPasswordError(true)
        }

        if (!term) {
            return setTermError(true)
        }

        console.log(email, nickname, password);
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname }
        })

    }, [email, password, passwordCheck, term])


    return (
        <>
        <AppLayout>
            <Head>
                <title>회원가입</title>
            </Head>  
            <Form onFinish={onSubmit}>
                <div>
                    <label htmlFor="user-email">이메일</label>
                    <br/>
                    <Input name="use-email" type="email" value={email} required onChange={onChangeEmail}/>
                </div>

                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br/>
                    <Input name="use-nickname" value={nickname} required onChange={onChangeNickname}/>
                </div>

                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="use-password" value={password} required onChange={onChangePassword}/>
                </div>

                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                    <br/>
                    <Input name="use-password-check" value={passwordCheck} required onChange={onChangePasswordCheck}/>
                    { passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>

                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>전연지 말을 잘 들을 것을 동의합니다.</Checkbox>
                    { termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                </div>

                <div style={{marginTop: 10}}>
                    <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
                </div>

            </Form>
        </AppLayout>
        </>
    )

}

export default SignUp;