import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import remark from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // /posts配下のファイル名を取得する
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

export function getAllPostIds() {
    const fileName = fs.readdirSync(postsDirectory)
    // 以下のような配列を返します
    // [
    //     {
    //         params: {
    //             id: 'ssg-ssr'
    //         }
    //     },
    //     {
    //         params: {
    //             id: 'pre-rendering'
    //         }
    //     }
    // ]
    return fileName.map( fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // 投稿のメタデータ部分を解析するためにgray-matterを使用する
    const matterResult = matter(fileContents)

    // マークダウンをHTML文字列に変換するためにremarkを使う
    const processedContent = await remark().use(html).process(matterResult.content)
    const contentHtml = processedContent.toString()

    // データをidと組み合わせる
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}