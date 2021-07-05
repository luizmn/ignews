import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <>
      <Head>
        <title>Ig.News</title>
      </Head>
      <div className={styles.container}>
        <h1>Index . js pa ge</h1>
      </div>
    </>
  )
}
