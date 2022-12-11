const API_URL = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

async function fetchAPI(query, { variables } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  return json.data;
}

export async function getAllPageSlugs() {
  const data = await fetchAPI(`
    {
        pages(first: 1000) {
            edges {
                node {
                    slug
                }
            }
        }
    }
    `);
  return data?.pages;
}

export async function getPage(slug) {
  const data = await fetchAPI(
    `
    fragment PageFields on Page {
        title
        slug
        content
        featuredImage {
            node {
                sourceUrl
                mediaDetails {
                    height
                    width
                }
            }
        }
    }
    query PostBySlug($id: ID!, $idType: PageIdType!) {
        page(id: $id, idType: $idType) {
            ...PageFields
        }
    }
    `,
    {
      variables: {
        id: slug,
        idType: 'URI',
      },
    }
  );

  return data.page;
}
