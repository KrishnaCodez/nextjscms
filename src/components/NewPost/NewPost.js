import React from 'react';
import { getPostsForHome } from 'lib/api';
export const NewPost = ({ posts }) => {
  return (
    <div>
      {posts.map(({ node }) => {
        return <h1>{node.title}</h1>;
      })}
    </div>
  );
};

export async function getStaticProps() {
  const posts = await getPostsForHome();

  return {
    props: { posts: posts.edges },
  };
}
