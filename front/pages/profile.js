import AppLayout from "../components/AppLayout";
import Head from 'next/Head'

const Profile = () => {
    return  (
        <>
        <Head>
            <meta charSet='utf-8'></meta>
            <title>내 프로필</title>
        </Head>  
        <AppLayout>
            <div>프로필페이지</div>
        </AppLayout>
        </>
    )
}

export default Profile;