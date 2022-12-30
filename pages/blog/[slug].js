import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router"
import SEOHead from "../../src/components/SEOHead/SEOHead";
import {API_URL} from "../../src/components/config";

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/wp-json/wp/v2/posts?_embed`);
  const posts = await res.json();
  
  const paths = posts.map((post)=> ({ params: {slug: post.slug}}))

  return {
    paths,
    fallback:false
  };
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  const singlePostURL = `${API_URL}/wp-json/wp/v2/posts?slug=${slug}`;
  
  const postBySlug = await fetch(singlePostURL)
  const post = await postBySlug.json()

  return {
    props: { post },
  };
}

const Post = ({ post }) => {
  const router = useRouter();
  const mounted = useRef(false)
  useEffect(
  () => {
    if(mounted.current) return
    mounted.current = true
    return () => mounted.current = false
  },[post[0].excerpt, post[0], router.query.slug]);

  return (
    <>
    <SEOHead 
      title={post[0].title.rendered} 
      description={post[0].excerpt.rendered.replace(/<[^>]+>/g, '')}
      pageURL={`https://www.yourdomain/blog/${post[0].slug}`} 
      canonicalLink={`https://www.yourdomain/blog/${post[0].slug}`}
    />
    {/* <Container className="blog-post-container" maxWidth="md">
      <div>
        <article>
          <h1>{post[0].title.rendered}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: post[0] && post[0].content.rendered
            }}
          />
        </article>
      </div>
    </Container> */}
    </>
  )
}

export default Post