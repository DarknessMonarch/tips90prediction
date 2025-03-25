"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import styles from "@/app/styles/dashNavLink.module.css";
import { RiVipLine as VipIcon } from "react-icons/ri";
import { GiReceiveMoney as MoneyIcon } from "react-icons/gi";
import { GiBasketballBasket as BasketballIcon } from "react-icons/gi";
import { GoGoal as StraightWinIcon } from "react-icons/go";
import { GiGoalKeeper as BankerIcon } from "react-icons/gi";
import { GiSportMedal as WinIcon } from "react-icons/gi";

export default function DashNavLink() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const activeLink = searchParams.get('link');

  const dashLinkData = [
    {
      name: "banker",
      icon: (
        <BankerIcon
          alt="banker icon"
          aria-label="banker icon"
          className={styles.dashlinkIcon}
        />
      ),
    },
    {
      name: "basketball",
      icon: (
        <BasketballIcon
          alt="basketball icon"
          aria-label="basketball icon"
          className={styles.dashlinkIcon}
        />
      ),
    },
    {
      name: "straight",
      icon: (
        <StraightWinIcon
          alt="straight icon"
          aria-label="straight icon"
          className={styles.dashlinkIcon}
        />
      ),
    },
    {
      name: "winning",
      icon: (
        <WinIcon
          alt="winning icon"
          aria-label="winning icon"
          className={styles.dashlinkIcon}
        />
      ),
    },
    {
      name: "vip",
      icon: (
        <VipIcon
          alt="vip icon"
          aria-label="vip icon"
          className={styles.dashlinkIcon}
        />
      ),
    },
    {
      name: "price",
      icon: (
        <MoneyIcon
          alt="price icon"
          aria-label="price icon"
          className={styles.dashlinkIcon}
        />
      ),
    },
  ];

  const createQueryString = (name, value) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    
    const card = searchParams.get('card');
    if (card) {
      params.set('card', card);
    }
    
    return params.toString();
  };

  const handleLinkClick = (linkName) => {
    router.push(`${pathname}?${createQueryString('link', linkName)}`);
  };

  return (
    <div className={styles.dashLinkContainer}>
      {dashLinkData.map((data, index) => (
        <div
          className={`${styles.dashLink} ${
            activeLink === data.name ? styles.dashLinkActive : ""
          }`}
          onClick={() => handleLinkClick(data.name)}
          key={index}
        >
          {data.icon}
        </div>
      ))}
    </div>
  );
}