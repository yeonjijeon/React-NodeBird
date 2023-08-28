import Head from "next/Head";
import AppLayout from "../components/AppLayout";
import FollowList from "../components/FollowList";
import NickNameEditForm from "../components/NickNameEditForm";
import React, { useEffect } from "react";
import Router from 'next/router'
import { useSelector } from "react-redux";

const Profile = () => {
    const { me } = useSelector( (state) => state.user )
    
    useEffect( () => {
        if (!(me && me.id)) {
            Router.push('/')
        }
    }, [me && me.id])


    if (!me) { 
        return null
    }
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