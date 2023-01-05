import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import { Layout } from "../../components/layout";

export default function FistPost() {
  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      {/* Scriptの詳細：https://nextjs.org/docs/basic-features/script */}
      {/*
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload" // scriptをいつロードするか制御
        onLoad={() => console.log(`script loaded correctly, window.FB has been populated`)} // scriptが読み込まれた直後に実行
      />
      */}
      <h1>First Post</h1>
      <h2>
        {/* STUDY: Next.js v12.2 以降では aタグをラップする必要はない */}
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  )
}