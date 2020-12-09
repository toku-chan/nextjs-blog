import Head from 'next/head'
import Link from 'next/link'

import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date.js'
import { getSortedPostsData } from '../lib/posts.js'

import utilStyles from '../styles/utils.module.css'

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>今現在Next.jsの学習中</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          { allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/post/${id}`}>
                <a>{title}</a>
              </Link><br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}

// getStaticPropsはサーバサイドでのみ実行される
// getStaticProps：開発環境では「毎回リクエストごとに実行」/ 本番環境では「ビルド時にのみ実行」される
// getStaticPropsはページからのみexportが可能（pages配下のファイルのみ）
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

// おまけ
// リクエスト時にデータを取得してからページを表示する場合は、サーバサイドレンダリングで実装するしかない
// その時は「getStaticProps」を使用するのではなく、SSRに適した「getServerSideProps」を使用すること
/**
 * example
 * export async function getServerSideProps(context) {
 *  return {
 *    props: {
 *      コンポーネントに渡すためのprops（上記のHomeに渡す内容）
 *    }
 *  }
 * }
 */