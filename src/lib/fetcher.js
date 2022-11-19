const WP_API = process.env.WORDPRESS_GRAPHQL_ENDPOINT;

async function fetcher(query, { variables } = {}) {
  const res = await fetch(WP_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  return json;
}

export default fetcher;
