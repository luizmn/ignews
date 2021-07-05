import styles from "./styles.module.scss";
import { SiBuymeacoffee } from "react-icons/si"

interface SubscribeButtonProps {
  priceId: string;
}
export function SubscribeButton({priceId}: SubscribeButtonProps) {
  return (
    <button className={styles.subscribeButton}>
      <SiBuymeacoffee />
      Subscribe Now
    </button>

  )
}