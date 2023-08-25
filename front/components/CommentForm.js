import React, { useCallback, useEffect } from "react"
import { Button, Form, Input } from "antd"
import PropTypes from 'prop-types'
import useInput from "../hooks/useInput"
import { useDispatch, useSelector } from "react-redux"
import { ADD_COMMENT_REQUEST, addPost } from "../reducers/post"

const CommentForm = ({post}) => {
    const dispatch = useDispatch()
    
    const id = useSelector( (state) => state.user.me?.id)
    const { addCommentDone, addCommentLoading } = useSelector( (state) => state.post )

    const [commentText, onChangeCommentText, setCommentText] = useInput('')
    
    const onSubmitComment = useCallback( () => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id }
        })

    }, [id, commentText])

    useEffect( () => {
        if(addCommentDone) {
            setCommentText('')
        }
    }, [addCommentDone])

    return(
        <Form onFinish={onSubmitComment} style={{ position: 'relative', margin:0 }}>
            <Form.Item>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button 
                style={{ position: 'absolute', right: 0, bottom: -40, zIndex:1}} 
                type="primary" loading={addCommentLoading}
                htmlType="submit">tweet</Button>
            </Form.Item>
        </Form>
    )
}


CommentForm.propTypes = {
    post: PropTypes.object.isRequired
}

export default CommentForm