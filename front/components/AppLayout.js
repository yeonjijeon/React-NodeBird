import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu, Input, Row, Col } from 'antd';


const AppLayout = ({children}) => {
    return (
        <div>
            <Menu mode='horizontal'>
                <Menu.Item>
                    <Link href="/" >노드버드</Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile">프로필</Link>
                </Menu.Item>
                <Menu.Item>
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }}></Input.Search>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/signup">회원가입</Link>
                </Menu.Item>
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    왼쪽 메뉴
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