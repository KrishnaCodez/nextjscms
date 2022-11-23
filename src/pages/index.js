import Head from 'next/head';
import Image from 'next/image';

import Layout from 'components/Layout';

import Section from 'components/Section';
import Container from 'components/Container';
import Link from 'next/link';
import { getPostsForHome } from 'lib/api';
import Intro from 'components/Intro';
import styles from 'styles/pages/Home.module.scss';

export default function Home({ posts }) {
  return (
    <Layout>
      <Intro />
      <div className={styles.container}>
        {posts.map(({ node }) => {
          return (
            <div className={styles.postcard}>
              <Link href={`/posts/` + node.slug} passHref>
                <a></a>
              </Link>

              <Link href={`/posts/` + node.slug} passHref>
                <a>
                  <h1 className={styles.title}>{node.title}</h1>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
      \
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = await getPostsForHome();

  return {
    props: { posts: posts.edges },
  };
}
