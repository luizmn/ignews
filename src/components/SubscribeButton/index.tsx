import styles from "./styles.module.scss";
import { SiBuymeacoffee } from "react-icons/si"
import { useSession, signIn } from "next-auth/client";
import { stripe } from "../../services/stripe";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import router from "next/router";


interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    if (!session) {
      signIn('github');
      return;
    }

    if (session.activeSubscription) {
      router.push('/posts');
      return;
    }

    try {
      const response = await api.post('/subscribe');

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe?.redirectToCheckout({sessionId});
    } catch (err) {
      alert(err.message);
    }
 }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      <SiBuymeacoffee />
      Subscribe Now
    </button>

  )
}