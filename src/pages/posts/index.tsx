import { GetStaticProps } from 'next';
import Head from 'next/head';
import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostsProps {
  posts: Post[];
}


export default function Posts({ posts }: PostsProps) {

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          { posts.map(post => (
            <a href="#" key={post.slug}>
              <time>{post.updatedAt}</time>
              <strong>{post.title}</strong>
              <p>{post.excerpt}</p>
            </a>
          ))}

      
        </div>
      </main>
    </>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query([
    Prismic.predicates.at('document.type','post')
    
  ], {
    fetch: ['post.data.title', 'postcontent'],
    //fetch: ['post.title'],
    //fetch: ['postcontent'],
    pageSize: 50,
  })

  const posts = response.results.map(post => {

    return {
      slug: post.id,
      title: RichText.asText(post.data.title),
       excerpt: post.data.postcontent.find(postcontent => postcontent.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString('PT-BR',
        { 
          day: '2-digit',
          month: 'long',  
          year: 'numeric' 
        })
      };
    });

  return {
    props: {
      posts
    }
  }
}