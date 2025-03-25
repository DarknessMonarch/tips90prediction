"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import DashNavLink from "@/app/components/dashboardItems/DashNavLinks";
import FootballTable from "@/app/components/Form/tables/FootballTable";
import BasketballTable from "@/app/components/Form/tables/BasketballTable";
import PaymentTable from "@/app/components/Form/tables/PaymentTable";
import VipTable from "@/app/components/Form/tables/VipTable";
import styles from "@/app/styles/sportActive.module.css";

export default function SportActive() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeLink = searchParams.get("link");
  const activeCard = searchParams.get("card");

  useEffect(() => {
    if (activeCard === "sports" && !activeLink) {
      const params = new URLSearchParams(searchParams);
      params.set("link", "banker");
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [activeCard, activeLink, pathname, router, searchParams]);

  const renderCardContent = (link) => {
    switch (link) {
      case "banker":
        return <FootballTable sport="banker" />;
      case "straight":
        return <FootballTable sport="straight" />;
      case "winning":
        return <FootballTable sport="winning" />;
      case "basketball":
        return <BasketballTable sport="basketball" />;
      case "vip":
        return <VipTable sport="vip" />;
      case "price":
        return <PaymentTable sport="price" />;
      default:
        return <FootballTable sport="banker" />;
    }
  };

  return (
    <div className={styles.sportActiveContainer}>
      <DashNavLink />
      <div className={styles.sportActiveLayout}>
        {renderCardContent(activeLink)}
      </div>
    </div>
  );
}