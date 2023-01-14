import NextApp from 'next/app';

import { SiteContext, useSiteContext } from 'hooks/use-site';
import { SearchProvider } from 'hooks/use-search';

import { getSiteMetadata } from 'lib/site';
import { getRecentPosts } from 'lib/posts';
import { getCategories } from 'lib/categories';
import NextNProgress from 'nextjs-progressbar';
import { getAllMenus } from 'lib/menus';
import Script from 'next/script';

import 'styles/globals.scss';
import 'styles/wordpress.scss';
import variables from 'styles/_variables.module.scss';

import '@urvishmali/kadence-headless-styles/kadence.css';
import Head from 'next/head';

function App({ Component, pageProps = {}, metadata, recentPosts, categories, menus }) {
  const site = useSiteContext({
    metadata,
    recentPosts,
    categories,
    menus,
  });

  return (
    <div>
      <Script strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=UA-254146038-1" />
      <Script strategy="afterInteractive" id="google-analytics">
        {`  window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                 gtag('config', 'UA-254146038-1');
            `}
      </Script>

      <SiteContext.Provider value={site}>
        <SearchProvider>
          <NextNProgress height={4} color={variables.progressbarColor} />
          <Component {...pageProps} />
        </SearchProvider>
      </SiteContext.Provider>
    </div>
  );
}

App.getInitialProps = async function (appContext) {
  const appProps = await NextApp.getInitialProps(appContext);

  const { posts: recentPosts } = await getRecentPosts({
    count: 5,
    queryIncludes: 'index',
  });

  const { categories } = await getCategories({
    count: 5,
  });

  const { menus = [] } = await getAllMenus();

  return {
    ...appProps,
    metadata: await getSiteMetadata(),
    recentPosts,
    categories,
    menus,
  };
};

export default App;
