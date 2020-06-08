import Layout from '../../Components/Layout/Layout';

import { getAllPostIds, getPostData } from '../../lib/posts';
import Date from '../../Components/Date/Date';
import Head from 'next/head';
import UtilsStyles from '../../Styles/utils.module.css';

export default function Post({ postData }) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={UtilsStyles.headingXl}>{postData.title}</h1>
                <div className={UtilsStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
                ></div>
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    //Return a list of possible value for id
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    //Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);

    return {
        props: {
            postData,
        },
    };
}
