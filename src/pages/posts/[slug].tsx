import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import { getPrismicClient } from "../../services/prismic";
import { RichText } from 'prismic-dom';
import Head from "next/head";

import styles from "./post.module.scss";
import Image from "next/image";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
    img: string;
    imgWidth: string;
    imgHeight: string;
    imgAlt: string;
  }
}
export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | IgNews</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <Image
            src={post.img}
            width={post.imgWidth}
            height={post.imgHeight}
            alt={post.imgAlt}
          />
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })

  const { slug } = params;

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const prismic = getPrismicClient(req)

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.postcontent),
    img: response.data.postimage.url,
    imgAlt: response.data.postimage.alt,
    imgWidth: response.data.postimage.dimensions.width,
    imgHeight: response.data.postimage.dimensions.height,
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('PT-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })

  }

  return {
    props: {
      post
    }
  }
}