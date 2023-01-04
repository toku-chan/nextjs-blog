import Link from "next/link";

export default function FistPost() {
  return (
    <>
      <h1>First Post</h1>
      <h2>
        {/* STUDY: Next.js v12.2 以降では aタグをラップする必要はない */}
        <Link href="/">Back to home</Link>
      </h2>
    </>
  )
}