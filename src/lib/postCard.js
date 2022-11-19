//  query NewQuery {
//      posts(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
//       nodes {
//         id
//         date
//         excerpt
//         title
//         slug
//         featuredImage {
//           node {
//             srcSet
//             sourceUrl
//             uri
//           }
//         }
//       }
//     }
//   }

export const ALL_POSTS = `query AllPosts {
    posts(first: 20, where: {orderby: {field: DATE, order: DESC}}) {
        nodes {
          id
          date
          excerpt
          title
          slug
          featuredImage {
            node {
              srcSet
              sourceUrl
              uri
            }
          }
        }
      }
   
}`;
