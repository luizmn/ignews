import Head from 'next/head';
import Image from 'next/image';
import { SubscribeButton } from '../components/SubscribeButton';
import styles from './home.module.scss';
import avatarImg from '/public/images/avatar.svg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | Ig.News</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, Welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publication <br />
            <span>for $9.90/month</span>
          </p>
          <SubscribeButton />
        </section>
        <Image src={avatarImg} alt="Girl coding" />
      </main>
    </>
  )
}
