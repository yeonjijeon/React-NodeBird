import 'antd/dist/antd'
import PropTypes from 'prop-types'
import Head from 'next/Head'
import wrapper from '../store/configureStore'

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
    Component : PropTypes.elementType.isRequired
}

// export default NodeBird;

export default wrapper.withRedux(NodeBird)