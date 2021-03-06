import { GetStaticProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';
import styles from './home.module.scss';
import avatarImg from '/public/images/avatar.svg';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
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
            <span>for {product.amount}/month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>
        <Image src={avatarImg} alt="Girl coding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1J9sFBL5f1N1A7ZA704wxsJk');

  const product = {
    priceId: price.id,
    amount: (new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',})).format(price.unit_amount / 100),
  };

  return {
    props: {
      product
  },
  revalidate: 60 * 60 * 48, //24 hours
  }
}