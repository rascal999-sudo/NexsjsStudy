import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark"
import html from "remark-html";

const postsDirectory  = path.join(process.cwd(),"posts");

export function GetPostsData(){

    const filenames = fs.readdirSync(postsDirectory);
    const allPostData = filenames.map((filename) => {
        const id = filename.replace(/\.md$/,"") ; // ファイル名(id)
        
        // マークダウンファイルを文字列として読み取る
        const fullpath = path.join(postsDirectory,filename);
        const fileContent = fs.readFileSync(fullpath,"utf8");

        const matterResult = matter(fileContent);

        // id とreturnを返す
        return{
            id,
            ...matterResult.data,
        }
    });
    return allPostData; 
}

export async function getStaticProps( {params} ){

}

//getStaticsPathでreturnで使うpathを取得する
export function getAllPostIds() {
    const filenames = fs.readdirSync(postsDirectory);
    // map(filename) ではなく map((filename) => { ... }) とします
    return filenames.map((filename) => {
        return {
            params: {
                id: filename.replace(/\.md$/, ""),
            },
        };
    });
}

// idに基づいてブログ投稿データを渡す
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory,`${id}.md`)
    const fileContent = fs.readFileSync(fullPath,"utf8");

    const matterResult = matter(fileContent);

    const blogContent = await remark().use(html).process(matterResult.content);
    const blogContentHtml = blogContent.toString()
    console.log("fullPath:"+fullPath)
    console.log("blogContent:"+blogContent)
    console.log("blogContentHtml:"+blogContentHtml)
    return{
        id,
        blogContentHtml,
        ...matterResult.data,
    };
}