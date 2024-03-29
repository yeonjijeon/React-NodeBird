import React, { List, Button, Card } from 'antd';
import { StopOutLined } from '@ant-design/icons'
import PropTypes from 'prop-types'


const FollowList = ({ header, data }) => {

    return(
        <List
            style={{ marginTop: 20}}
            grid={{ gutter:4, xs: 2, md: 3}}
            size="small"
            header= { <div>{header}</div> }
            loadMore={ <div style={{ textAlign: 'center', margin: '10px 0' }}> <Button>더보기</Button></div> }
            bordered
            dataSource={data}
            renderItem={ (item) => {
                <List.Item style={{ marginTop: 20 }}>
                    <Card actions={[ <StopOutLined key="stop"/>]}>
                        <Card.Meta description={item.nickname}> </Card.Meta>
                    </Card>
                </List.Item>
            }}
        >
        </List>
    )

}

FollowList.prototype = {
    header : PropTypes.string.isRequired,
    data : PropTypes.array.isRequired
}


export default FollowList