import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>05 de agosto de 2021</time>
            <strong>Creating a simple post</strong>
            <p>The maximum file size allowed for all media (photos, videos or voice messages) to be sent or forwarded through WhatsApp is 16 MB on all platforms. On most phones, this will equal from about 90 seconds to 3 minutes of video.</p>
          </a>
          <a href="#">
            <time>05 de agosto de 2021</time>
            <strong>Creating a simple post</strong>
            <p>The maximum file size allowed for all media (photos, videos or voice messages) to be sent or forwarded through WhatsApp is 16 MB on all platforms. On most phones, this will equal from about 90 seconds to 3 minutes of video.</p>
          </a>
          <a href="#">
            <time>05 de agosto de 2021</time>
            <strong>Creating a simple post</strong>
            <p>The maximum file size allowed for all media (photos, videos or voice messages) to be sent or forwarded through WhatsApp is 16 MB on all platforms. On most phones, this will equal from about 90 seconds to 3 minutes of video.</p>
          </a>
        </div>
      </main>
    </>
  );
}