import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to the Inbox Escape Room</h1>
      <p className={styles.text}>Are you ready to solve puzzles and escape the inbox?</p>
      <Link href="/story">
        <button className={styles.startButton}>Start the Escape Room</button>
      </Link>
    </div>
  );
};

export default Home;
