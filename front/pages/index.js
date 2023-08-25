import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import React from "antd";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
    const { me } = useSelector( (state) => state.user )
    const { mainPosts } = useSelector( (state) => state.post )

    return(
        <>
            <AppLayout>
                { me && <PostForm/> }
                { mainPosts.map( (post, index) => <PostCard key={post.id} post={post} />) }
            </AppLayout>
        </>
    )
}

export default Home;
