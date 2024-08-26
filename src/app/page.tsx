'use client';
import Head from 'next/head';
import { useRouter } from 'next/navigation'
import styles from '../styles/Home.module.css';
import { LOGIN_URL } from '@/constants/constants';
import { Google } from '@mui/icons-material';

export default function Home() {
  const router = useRouter()
  const handleLogin = ():void =>{
    if(localStorage.getItem('id') && localStorage.getItem("id") != "null") 
      router.push(`/story?id=${localStorage.getItem('id')}&email=${localStorage.getItem('email')}`);
    window.location.href = LOGIN_URL;
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Mystery Trails</title>
        <meta name="description" content="Dive into the mystery and solve intriguing puzzles!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.hero}>
        <h1 className={styles.title}>Welcome to the Mystery Trails</h1>
        <p className={styles.description}>
        Are you ready to solve some mysteries? Let`s dive into the unknown!
        </p>
        <div style={{display:'flex', justifyContent:'center'}}>
        <button className={styles.signInButton}  onClick={handleLogin}>
          <Google />
          <span style={{paddingLeft:'1rem'}}>
          Sign in with Google and Get Started
          </span>
        </button>
        </div>
      </div>
    </div>
  );
}
