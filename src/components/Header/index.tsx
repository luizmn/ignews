import Image from "next/image";
import logoImg from "/public/images/logo.svg"
import styles from "./styles.module.scss";
import { SignInButton } from "../SignInButton";


export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src={logoImg} alt="App Logo" />
        <nav>
          <a className={styles.active}>Home</a>
          <a>Posts</a>
        </nav>
        <SignInButton />
      </div>
    </header>
  )
}