import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // /postsはいかのファイル名を取得する
    // ファイル名がURLとして使われる
    const fileName = fs.readdirSync(postsDirectory)
    const allPostsData =fileName.map(fileName => {
        // idを取得するためにファイルから".md"を削除
        const id = fileName.replace(/\.md$/, '')

        // マークダウンファイルを文字列として読み取る
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // 投稿のメタデータ部分を解析するためにgray-matterを使う
        const matterResult = matter(fileContents)

        // データをidと合わせる
        return {
            id,
            ...matterResult.data
        }
    })

    // 投稿を日付でソートする
    return allPostsData.sort((a, b) => {
        if(a.data < b.data) {
            return 1
        } else {
            return -1
        }
    })
}