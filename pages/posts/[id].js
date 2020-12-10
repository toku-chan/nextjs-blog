import Head from 'next/head'
import Layout from '../../components/layout.js'
import { getAllPostIds, getPostData } from '../../lib/posts.js'
import Date from '../../components/date.js'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    // idとしてとりうる値のリストを返す
    // 今回はssg-ssrとpre-rendering
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    // params.idを使用してブログの投稿に必要なデータを取得する
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}