import Link from 'next/link';
import { getPostsForHome } from 'lib/api';

import styles from 'styles/pages/Home.module.scss';
import LandingSection from 'components/LandingSection';

import Nav from 'components/Nav';

export default function Home({ posts }) {
  return (
    <div>
      <Nav />
      <h1 className={styles.hidden}>a</h1>
      <LandingSection />

      <div className={styles.headContainer}>
        <h1 className={styles.h1}>
          Our Latest <br /> Blog
        </h1>
      </div>
      <div className={styles.container}>
        {posts.map(({ node, key }) => {
          return (
            <div className={styles.postcard} key={node.slug}>
              <Link href={`/posts/` + node.slug} passHref>
                <a></a>
              </Link>
              <Link href={`/posts/` + node.slug} passHref>
                <img src={node.featuredImage.node.sourceUrl} className={styles.img} alt="" />
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
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getPostsForHome();

  return {
    props: { posts: posts.edges },
  };
}
