import Head from 'next/head'

export default function SEOHead({
    title,
    description,
    robots,
    type,
    locale,
    pageURL,
    site_name,
    canonicalLink
  }){
    return (
      <Head>
        {/* 50 - 60 chars long recommended, include target keyword */}
        <title>{title ? title : 'Digyt'}</title>
        
        {/* Be sure description matches the relative search query or search bots may ignore and suggest other content ( 150-160 chars max) */}
        <meta name="description" content={description ?  description : "test test test"} />

        {/* For scaling (no zooming in on form fields on mobile) */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {robots && <meta name="robots" content={robots} /> }

        <meta property="og:title" content={title ? title : 'Digyt | Detroit Web Development and SEO'} />
        <meta property="og:locale" content={locale ? locale : "en-US"} />
        <meta property="og:type" content={type ? type : "website"} />
        <meta property="og:description" content={description ? description : ""}/>
        <meta property="og:url" content={pageURL ? pageURL : ""} />
        <meta property="og:site_name" content={site_name ? site_name : "Digyt"} />
        <meta name="twitter:description" content={description ? description : ""} />
        <meta name="twitter:title" content={title ? title : 'Digyt'} />
        <link rel="canonical" href={canonicalLink} />
      </Head>
    );
  }  