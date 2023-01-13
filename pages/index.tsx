import Head from 'next/head';
import Link from 'next/link';
import { getSortedPostsData } from "../lib/posts";
import { Layout, siteTitle } from '../components/layout';
import { Date } from '../components/date';
import utilStyles from "../styles/utils.module.css";

export const getStaticProps = async() => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
};

export default function Home({
  allPostsData
}: {
  allPostsData :{
    id: string;
    title: string;
    date: string;
  } []
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>vercelの「プッシュするごとにデプロイをプレビュー」を試すために文言の更新をする</p>
        <p>(This is a sample website - you’ll be building a site like this on{' '}<a href="https://nextjs.org/learn">our Next.js tutorial</a>.)</p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({
            id,
            date,
            title
          }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.ligthText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}