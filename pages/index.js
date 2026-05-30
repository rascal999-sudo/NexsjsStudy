import styles from "../styles/Home.module.css"
import Link from "next/link"
import Layout,{ siteTitle} from "@/components/Layout";
import utilstyle from "../styles/utils.module.css"
import { GetPostsData } from "@/components/lib/post"; 

export default function Home({allPostsData}) {
  return <Layout home>
    <head>
      <title>{siteTitle}</title>
    </head>
    <section className={utilstyle.headingMd}>
      <p>
        私はフルスタックエンジニアを目指してます、Udemyで勉強中です。好きな言語はjavascript（開発歴２５年）です。
      </p>
    </section>

    <section className={`${utilstyle.headingMd} ${utilstyle.padding1px}`}>
      <h2>📝エンジニアのブログ</h2>
      <div className={styles.grid}>
        {allPostsData.map(({id,title,date,thumbnail}) => (
          <article key={id}>
            <Link href={`/posts/${id}`}>
              <img src={`${thumbnail}`} className={styles.thumbnailImage}/>
           </Link>
            <Link href={`/posts/${id}`} className={utilstyle.boldText}>
                {title}
            </Link>
            <br />
            <small className={utilstyle.lightText}>{date}</small>
          </article>
        ))}

      </div>
    </section>

  </Layout>
}

// SSGの場合
export async function getStaticProps() {
  const allPostsData = GetPostsData();   //id,title,date,thumbnail
  console.log(allPostsData);
  return {
    props:{
      allPostsData,
    },
  };
}

