"use client";

import { useEffect } from "react";
import { redirect } from 'next/navigation';
import styles from "@/app/styles/app.module.css";
import LoadingLogo  from "@/app/components/LoadingLogo";

export default function App() {
  useEffect(() => {
    redirect('/page/banker');
  }, []);
  
  return (
    <div className={styles.app}>
      <LoadingLogo />
    </div>
  );
}