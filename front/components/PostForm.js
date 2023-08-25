import React, {Button, Form, Input} from "antd";
import { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from '../reducers/post'
import { useRef } from "react";
import useInput from "../hooks/useInput";

const PostForm = () => {
    
    const { imagePaths, addPostDone } = useSelector( (state) => state.post )
    const dispatch = useDispatch()
    const [text, onChangeText, setText] = useInput('');

    
    const onSubmit = useCallback( () => {
        dispatch(addPost(text))
    }, [text])

    // const onClickImageUpload = useCallback( () => {
        // imageInput.current.click()
    // }, [imageInput])

    // const imageInput = useRef() // 실제 dom에 접근하기 위해서 ref사용


    useEffect( () => {
        if (addPostDone) {
            setText('')
        }
    }, [addPostDone])


    return (
        <Form style = {{ margin : '10px 0 20px'}} encType="multipart/form-data" onFinish={onSubmit}>

            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?"/>
            <div>
                {/* <input type="file" multiple hidden ref={imageInput}/> */}
                {/* <Button onClick={onClickImageUpload}>이미지 업로드</Button> */}
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{ float : 'right'}} htmlType="submit">짹짹</Button>
            </div>
            <div>
                {imagePaths.map( (v) => (
                    <div key={v} style={{ display: 'inline-block'}}>
                        <img src={v} style={{ width: '200px'}} alt={v} />
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                ))}
            </div>

        </Form>
    )
}

export default PostForm;