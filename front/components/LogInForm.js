import { useCallback, useMemo } from "react"
import React, { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useInput from "../hooks/useInput";
import {useDispatch, useSelector} from 'react-redux'
import { LOG_IN_REQUEST } from "../reducers/user";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`

const FormWrapper = styled(Form)`
    padding: 10px
`

const LogInForm = () => {
    const dispatch = useDispatch()

    const [email, onChangeEmail] = useInput('')
    const [password, onChangePassword] = useInput('')
    const { logInLoading } = useSelector((state)=>state.user);

    const onSubmitForm = useCallback( () => {
        // e.preventDefault(); 
        // antd 에서는 사용하면 안됨. onFinish는 적용되어있음
        console.log(email, password);

        // dispatch(loginRequestAction({email: email, password: password}))
        
        dispatch({
            type: LOG_IN_REQUEST,
            data: { email, password }
        })
    }, [email, password])
    


    return (
        <FormWrapper onFinish={onSubmitForm}>
            <div>
                <label htmlFor="user-email">이메일</label>
                <br/>
                <Input name="user-email" value={email} type="email" onChange={onChangeEmail} required></Input>
            </div>
            <div>
                <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input name="user-password" value={password} onChange={onChangePassword} required></Input>
            </div>
            <ButtonWrapper>
                <Button type ="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
                <Link href="/signup"><Button>회원가입</Button></Link>
            </ButtonWrapper>
        </FormWrapper>
    )
}


export default LogInForm