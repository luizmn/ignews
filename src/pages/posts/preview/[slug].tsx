import { GetStaticPaths, GetStaticProps } from "next";
import { getSession, useSession } from "next-auth/client";
import { getPrismicClient } from "../../../services/prismic";
import { RichText } from 'prismic-dom';
import Head from "next/head";
import Link from "next/link";

import styles from "../post.module.scss";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface PostPreviewProps {
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
export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`)
    }
  }, [session])

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
            className={`${styles.postContent} ${styles.previewContent}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className={styles.continueReading}>
            Want to continue reading?
            <Link href="/">
              <a href="">Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({  params }) => {

  const { slug } = params;

  const prismic = getPrismicClient()

  const response = await prismic.getByUID('post', String(slug), {});

  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.postcontent.splice(0, 3)),
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
    },
    revalidate: 60 * 30, // revalidate after 30 minutes
  }
}