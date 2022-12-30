import React from "react";
import {ApolloClient, InMemoryCache, gql} from "@apollo/client";
import SEOHead from "../../src/components/SEOHead/SEOHead";
import {WORDPRESS_GRAPHQL, DOMAIN_NAME} from "../../src/config";

export default function Blog(newData) {
    const posts = newData.data.filter(post => post.node.featuredImage !== null && !post.node.title.includes('Case Study:') )
    return (
      <>
        <SEOHead
          title="SEO Blog"
          description="Dynamically rendered and SEO friendly"
          pageURL=""
          canonicalLink="test"
        />
      </>
    );
}

export async function getStaticProps() {

  const client = new ApolloClient({
    uri: WORDPRESS_GRAPHQL,
    cache: new InMemoryCache(),
  });
  
  const response = await client.query({
    query: gql`
      query MyQuery2 {
        posts {
          edges {
            node {
              slug
              title
              content
              date
              excerpt
              featuredImage {
                node {
                  sourceUrl(size: MEDIUM)
                  srcSet(size: MEDIUM)
                  mediaItemUrl
                }
              }
              link
              tags {
                edges {
                  node {
                    id
                    slug
                  }
                }
              }
              author {
                node {
                  id
                  name
                  avatar {
                    default
                    extraAttr
                    forceDefault
                    foundAvatar
                    height
                    isRestricted
                    rating
                    scheme
                    size
                    url
                    width
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  const data = response.data.posts.edges;

  return {
    props: {
      data,
      domain:DOMAIN_NAME
    },
  };
};