import {API_URL, DOMAIN_NAME} from '../src/config'

const EXTERNAL_DATA_URL = `https://${DOMAIN_NAME}/blog`;

const staticEndpoints = [
   'blog', 
   'about', 
   'contact'
]

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     ${staticEndpoints
        .map((item) => {
          return `
        <url>
            <loc>${`https://${DOMAIN_NAME}/${item}`}</loc>
        </url>
      `;
        })
        .join('')}
     ${posts
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
// getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const response = await fetch(`${API_URL}/wp-json/wp/v2/posts?_embed`);
    const posts = await response.json();

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts);

    res.setHeader('Content-Type', 'text/xml');
    // we send the XML to the browser
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
}

  export default SiteMap;