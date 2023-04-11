import 'antd/dist/antd'
import PropTypes from 'prop-types'
import Head from 'next/Head'

const NodeBird = ({Component}) => {
    // 모든 페이지에서 공통
    return(
        <>
            <Head>
                <meta charSet='utf-8'></meta>
                <title>NodeBird</title>
            </Head>  
            <Component/>
        </>
    )
}

NodeBird.prototype = {
    Component : PropTypes.element.isRequired
}

export default NodeBird;