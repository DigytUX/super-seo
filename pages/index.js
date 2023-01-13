import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import SEOHead from '../src/components/SEOHead/SEOHead'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <SEOHead
      title="Super SEO"
      description="Dynamically rendered and SEO friendly"
      pageURL=""
      canonicalLink=""
      />
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={inter.className}>Hello</h1>
        </div>
      </main>
    </>
  )
}
