"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Script from 'next/script';
import styles from "@/app/styles/app.module.css";
import LoadingLogo from "@/app/components/LoadingLogo";

export default function App() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/page/banker');
  }, [router]);
  
  return (
    <div className={styles.app}>
      <Head>
        <title>Tips90Predict - Redirecting to Sports Betting Tips</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://tips90predict.com/page/banker" />
      </Head>
      
      <Script id="http-redirect" strategy="beforeInteractive">
        {`
          // This helps search engines understand the redirect better
          if (navigator.userAgent.indexOf('Googlebot') === -1 && 
              navigator.userAgent.indexOf('bot') === -1 && 
              navigator.userAgent.indexOf('Bingbot') === -1) {
            window.location.replace('/page/banker');
          }
        `}
      </Script>
      
      <LoadingLogo />
    </div>
  );
}