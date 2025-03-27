"use client";

import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import LogoImg from "@/public/assets/logo.png";
import { useAuthStore } from "@/app/store/Auth";
import { useDrawerStore } from "@/app/store/Drawer";
import styles from "@/app/styles/sideNav.module.css";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

import { MdOutlineSettings as SettingsIcon } from "react-icons/md";
import { LuContact as ContactIcon } from "react-icons/lu";
import { RiVipLine as VipIcon } from "react-icons/ri";
import { RiDashboardHorizontalLine as DashboardIcon } from "react-icons/ri";
import { IoLogOut as LogoutIcon, IoMenu as MenuIcon } from "react-icons/io5";
import { IoBookOutline as TermsIcon } from "react-icons/io5";
import { PiTelegramLogo as TelegramLogo } from "react-icons/pi";
import { RiFolderInfoFill as AboutIcon } from "react-icons/ri";
import {
  GiReceiveMoney as MoneyIcon,
  GiSportMedal as WinIcon,
} from "react-icons/gi";
import { GiBasketballBasket as BasketballIcon } from "react-icons/gi";
import { GoGoal as StraightWinIcon } from "react-icons/go";
import { GiGoalKeeper as BankerIcon } from "react-icons/gi";

export default function SideNav() {
  const { isAuth, isAdmin, logout } = useAuthStore();
  const { isOpen, toggleOpen } = useDrawerStore();
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sidebarClasses = `${styles.sideContainer} ${
    isMobile
      ? isOpen
        ? styles.showSideNav
        : styles.hideSideNav
      : styles.showSideNav
  }`;

  const openTelegram = () => {
    if (isMobile && isOpen) toggleOpen();
    window.open("https://t.me/+p9eRLjKRtv45Y2Fk", "_blank");
  };

  const handleLogout = useCallback(async () => {
    if (isMobile && isOpen) toggleOpen();
    try {
      const result = await logout();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Logout failed");
    }
  }, [logout, isMobile, isOpen, toggleOpen]);

  // Handle link click for mobile
  const handleLinkClick = useCallback(() => {
    if (isMobile && isOpen) {
      toggleOpen();
    }
  }, [isMobile, isOpen, toggleOpen]);

  return (
    <div className={sidebarClasses}>
      {isMobile && (
        <div onClick={toggleOpen} className={styles.toggleMenuButton}>
          <MenuIcon
            className={styles.toggleMenuIcon}
            aria-label="Toggle menu"
            alt="toggle menu icon"
          />
        </div>
      )}
      <div className={styles.sideLogo}>
        <Image
          className={styles.logo}
          src={LogoImg}
          alt="logo"
          height={50}
          priority
        />
      </div>
      <div className={styles.sideTop}>
        {isAdmin && (
          <Link
            href="/page/dashboard/?card=revenue"
            className={styles.sideLink}
            onClick={handleLinkClick}
          >
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/dashboard" ||
                pathname.startsWith("/page/dashboard/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <DashboardIcon
                alt="dashboard icon"
                aria-label="dashboard icon"
                className={styles.linkIcon}
              />
              <h1>Dashboard</h1>
            </div>
          </Link>
        )}
        <Link
          href="/page/banker"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/banker" ||
              pathname.startsWith("/page/banker/")
                ? styles.activeLink
                : ""
            }`}
          >
            <BankerIcon
              alt="banker icon"
              aria-label="banker icon"
              className={styles.linkIcon}
            />
            <h1>Banker of the day</h1>
          </div>
        </Link>
        <Link
          href="/page/winning"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/winning" ||
              pathname.startsWith("/page/winning/")
                ? styles.activeLink
                : ""
            }`}
          >
            <WinIcon
              alt="winning icon"
              aria-label="winning icon"
              className={styles.linkIcon}
            />
            <h1>100% winning tips</h1>
          </div>
        </Link>
        <Link
          href="/page/straight"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/straight" ||
              pathname.startsWith("/page/straight/")
                ? styles.activeLink
                : ""
            }`}
          >
            <StraightWinIcon
              alt="straight icon"
              aria-label="straight icon"
              className={styles.linkIcon}
            />
            <h1>Straight wins</h1>
          </div>
        </Link>
        <Link
          href="/page/basketball"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/basketball" ||
              pathname.startsWith("/page/basketball/")
                ? styles.activeLink
                : ""
            }`}
          >
            <BasketballIcon
              alt="basketball icon"
              aria-label="basketball icon"
              className={styles.linkIcon}
            />
            <h1>Basketball</h1>
          </div>
        </Link>

        <Link
          href="/page/vip"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/vip" || pathname.startsWith("/page/vip/")
                ? styles.activeLink
                : ""
            }`}
          >
            <VipIcon alt="vip icon" className={styles.linkIcon} />
            <h1>Vip</h1>
          </div>
        </Link>
        <Link
          href="/page/payment"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/payment" ||
              pathname.startsWith("/page/payment/")
                ? styles.activeLink
                : ""
            }`}
          >
            <MoneyIcon
              alt="payment icon"
              aria-label="payment icon"
              className={styles.linkIcon}
            />
            <h1>How to pay</h1>
          </div>
        </Link>

        <div className={styles.sideLink} onClick={openTelegram}>
          <div className={styles.innerSideLink}>
            <TelegramLogo
              alt="telegran icon"
              aria-label="telegram icon"
              className={styles.linkIcon}
            />
            <h1>Join telegram</h1>
          </div>
        </div>

        <Link
          href="/page/about"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/about" || pathname.startsWith("/page/about/")
                ? styles.activeLink
                : ""
            }`}
          >
            <AboutIcon
              alt="about icon"
              aria-label="about icon"
              className={styles.linkIcon}
            />
            <h1>About us</h1>
          </div>
        </Link>

        <Link
          href="/page/terms"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/terms" || pathname.startsWith("/page/terms/")
                ? styles.activeLink
                : ""
            }`}
          >
            <TermsIcon
              alt="terms icon"
              aria-label="terms icon"
              className={styles.linkIcon}
            />
            <h1>Terms</h1>
          </div>
        </Link>
        <Link
          href="/page/contact"
          className={styles.sideLink}
          onClick={handleLinkClick}
        >
          <div
            className={`${styles.innerSideLink} ${
              pathname === "/page/contact" ||
              pathname.startsWith("/page/contact/")
                ? styles.activeLink
                : ""
            }`}
          >
            <ContactIcon
              alt="contact icon"
              aria-label="contact icon"
              className={styles.linkIcon}
            />
            <h1>Contact</h1>
          </div>
        </Link>
      </div>
      {isAuth && (
        <div className={styles.sideBottomContainer}>
          <Link
            href="/page/settings"
            className={styles.sideLink}
            onClick={handleLinkClick}
          >
            <div
              className={`${styles.innerSideLink} ${
                pathname === "/page/settings" ||
                pathname.startsWith("/page/settings/")
                  ? styles.activeLink
                  : ""
              }`}
            >
              <SettingsIcon
                alt="settings icon"
                aria-label="settings icon"
                className={styles.linkIcon}
              />
              <h1>settings</h1>
            </div>
          </Link>
          <div onClick={handleLogout}>
            <LogoutIcon
              alt="logout icon"
              aria-label="logout icon"
              className={styles.linkIcon}
            />
          </div>
        </div>
      )}
    </div>
  );
}
