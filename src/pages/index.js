import Link from 'next/link';
import { getPostsForHome } from 'lib/api';
import Head from 'next/head';

import styles from 'styles/pages/Home.module.scss';
import LandingSection from 'components/LandingSection';
import { AiOutlineFieldTime } from 'react-icons/ai';

import Nav from 'components/Nav';
import NewFooter from 'components/NewFooter';
import { formatDate } from 'models/formatDate';
import { sanitizeExcerpt } from 'models/excerpt';

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
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
              <div className={styles.metadata}>
                <div className={styles.author}>
                  <img
                    width="30px"
                    height="16px"
                    src={node.author.node.avatar.url}
                    className={styles.authorImg}
                    alt="Author Avatar"
                  />
                  <p>{node.author.node.name}</p>
                </div>
                <span>
                  <AiOutlineFieldTime className={styles.clock} />
                </span>
                <span className={styles.date}>{formatDate(node.date)}</span>
              </div>
              <div>
                <Link href={`/posts/` + node.slug} passHref>
                  <p className={styles.excerpt}>{sanitizeExcerpt(node.excerpt)}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <NewFooter />
    </div>
  );
}

export async function getStaticProps() {
  const posts = await getPostsForHome();

  return {
    props: { posts: posts.edges },
  };
}
