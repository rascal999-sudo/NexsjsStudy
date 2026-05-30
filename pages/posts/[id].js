import { getAllPostIds } from "@/components/lib/post";
import Layout from "../../components/Layout";
import { getPostData } from "@/components/lib/post"; 
import utilStyles from "../../styles/utils.module.css"
import Head from "next/head"

// 名前を getStaticProps に修正
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData, // 取得したデータをここに渡す
        },
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}


export default function Post({ postData }){
        console.log("postData.blogCo;ntentHtml2"+postData.blogContentHtml);
    return <Layout>
                <Head><title>{postData.title}</title></Head>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText}>{postData.date}</div>
                {/* HTMLをレンダリングするための特別な記述 */}
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHtml }} />
            </Layout>;
}