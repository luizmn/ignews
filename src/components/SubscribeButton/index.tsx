import styles from "./styles.module.scss";
import { SiBuymeacoffee } from "react-icons/si"

export function SubscribeButton() {
  return (
    <button className={styles.subscribeButton}>
      <SiBuymeacoffee />
      Subscribe Now
    </button>

  )
}