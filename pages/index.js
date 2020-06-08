import Head from 'next/head';
import Link from 'next/link';

import Layout, { siteTitle } from '../Components/Layout/Layout';
import utilStyles from '../Styles/utils.module.css';
import { getSortedPostData } from '../lib/posts';
import Date from '../Components/Date/Date';

export async function getStaticProps() {
    const allPostsData = getSortedPostData();

    return {
        props: {
            allPostsData,
        },
    };
}

const Home = ({ allPostsData }) => {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Hi, I'm Luís also know as Seringas since I have started in
                    the IT world. The story behind the nickname isn't funny as
                    the nickname it-self, but show how the WORLD is a small
                    place! I'm a Frontend Developer which love to keep learning
                    and grow. I think I'm in the right area because doesn't
                    exist a END!
                </p>
                <p>
                    (This is a sample website - you’ll be building a site like
                    this on{' '}
                    <a href="https://nextjs.org/learn">our Next.js tutorial</a>
                    .)
                </p>
            </section>
            <section
                className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}
            >
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} />
                            </small>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
};

export default Home;
