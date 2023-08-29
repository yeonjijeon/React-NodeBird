import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import React from "antd";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";
import { useEffect } from "react";
import { LOAD_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
    const dispatch = useDispatch()
    const { me } = useSelector( (state) => state.user )
    const { mainPosts, hasMorePost, loadPostsLoading } = useSelector( (state) => state.post )

    useEffect( () => {
        dispatch({
            type: LOAD_POSTS_REQUEST
        })
    }, [])

    useEffect( () => {
        function onScroll() {
            // scrollY: 얼마나 내렸는지
            // clientHeight: 화면 보이는 길이
            // scrollHeight: 총길이
            console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight)
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                // 인피니트 스크롤 (나중에 react virtualrized 기술 사용해볼것)
                if (hasMorePost && !loadPostsLoading) {
                    dispatch({
                        type: LOAD_POSTS_REQUEST
                    })
                }
            }
        }

        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }

    }, [hasMorePost, loadPostsLoading])

    return(
        <>
            <AppLayout>
                { me && <PostForm/> }
                { mainPosts.map((c) => ( <PostCard key={c.id} post={c} /> ))}
            </AppLayout>
        </>
    )
}

export default Home;
