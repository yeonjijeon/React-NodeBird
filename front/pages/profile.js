import Head from "next/Head";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NickNameEditForm from "../components/NickNameEditForm";
import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { me } = useSelector( (state) => state.user )
    
    return  (
        <>
        <Head>
            <meta charSet='utf-8'></meta>
            <title>내 프로필 | NodeBird</title>
        </Head>  
        <AppLayout>
            <div>프로필페이지</div>
            <NickNameEditForm/>
            <FollowList header="팔로잉" data={me.Followings}></FollowList>
            <FollowList header="팔로워" data={me.Followers}></FollowList>
        </AppLayout>
        </>
    )
}

export default Profile;