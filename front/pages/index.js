import AppLayout from "../components/AppLayout";
import Head from 'next/Head'

const Home = () => {
    return(
        <>
            <Head>
                <title>main</title>
            </Head>  
            <AppLayout>
                <div>Hello, Next!</div>
            </AppLayout>
        </>
    )
}

export default Home;