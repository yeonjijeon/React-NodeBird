import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { Menu, Input, Row, Col } from 'antd';
import UserProfile from './UserProfile';
import LogInForm from './LogInForm';
import styled from 'styled-components'
import {useSelector} from 'react-redux'

const SearchInput = styled(Input.Search)`
    vertical-align: middle;
`

const AppLayout = ({children}) => {
    const { me } = useSelector((state)=> state.user);

    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item key="title">
                    <Link href="/" >노드버드</Link>
                </Menu.Item>
                <Menu.Item key="profile">
                    <Link href="/profile">프로필</Link>
                </Menu.Item>
                <Menu.Item key="search">
                    <SearchInput enterButton/>
                </Menu.Item>
                <Menu.Item key="signup">
                    <Link href="/signup">회원가입</Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    { me ? <UserProfile/> : <LogInForm/> }
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href='https://www.zerocho.com' target='_blank' rel='noreferrer noopener'>Made By Zerocho</a>
                </Col>
            </Row>
            
        </div>
    )
}

AppLayout.prototype = {
    children: PropTypes.node.isRequired,
}


export default AppLayout