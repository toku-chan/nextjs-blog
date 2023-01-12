import { AppProps } from "next/app";
import "../styles/globals.css";

// _app.jsはアプリケーション内の全てのページをラップする最上位のReactコンポーネント
// 全てのページに影響を与えることができる、また全てのページで共通の状態を保持したい時にも使える
export default function APP ({ Component, pageProps}: AppProps) {
  return <Component {...pageProps} />
};
