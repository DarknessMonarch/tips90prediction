"use client";

import { toast } from "sonner";
import Image from "next/image";
import debounce from "lodash.debounce";
import Loading from "@/app/components/StateLoader";
import { useAuthStore } from "@/app/store/Auth";
import { useDrawerStore } from "@/app/store/Drawer";
import styles from "@/app/styles/navbar.module.css";
import ProfileImg from "@/public/assets/banner.png";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

import {
  RiSearch2Line as SearchIcon,
  RiUserLine as UserIcon,
} from "react-icons/ri";
import { IoLogOut as LogoutIcon } from "react-icons/io5";
import {
  HiOutlineMenuAlt2 as MenuIcon,
} from "react-icons/hi";

const SearchBar = ({ value, onChange, className }) => (
  <div className={`${styles.searchContainer} ${className}`}>
    <SearchIcon
      alt="search icon"
      className={styles.searchIcon}
      aria-label="Search"
    />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search ..."
      className={styles.searchInput}
      aria-label="Search input"
    />
  </div>
);

export default function NavbarComponent() {

  
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, toggleOpen } = useDrawerStore();
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState("");

  const { isAuth, username, profileImage, isAdmin, isVip, logout } =
    useAuthStore();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSearchablePage =
    pathname === "/page/banker" ||
    pathname === "/page/basketball" ||
    pathname === "/page/straight" ||
    pathname === "/page/winning" ||
    pathname === "/page/vip";

  const performSearch = useMemo(
    () =>
      debounce((searchValue) => {
        const params = new URLSearchParams(searchParams);
        if (searchValue) {
          params.set("q", searchValue);
        } else {
          params.delete("q");
        }
        router.replace(`${pathname}?${params}`);
      }, 300),
    [searchParams, router, pathname]
  );

  useEffect(() => {
    performSearch(search.trim());
    return () => performSearch.cancel();
  }, [search, performSearch, isSearchablePage]);

  const handleInputChange = useCallback((event) => {
    setSearch(event.target.value);
  }, []);


  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await logout();
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  const handleLogin = useCallback(() => {
    router.push("/authentication/login", { scroll: false });
  }, [router]);

  const getUserStatus = () => {
    if (isAdmin) return "admin";
    if (isVip) return "vip";
    return "user";
  };

  return (
    <>
      <div className={styles.navMain}>
        <div className={styles.navContainer}>
          <div className={styles.navContainerLeft}>
            {!isOpen && (
              <MenuIcon
                onClick={toggleOpen}
                className={styles.menuIcon}
                aria-label="Toggle menu"
                alt="toggle menu icon"
              />
            )}
         
            {isSearchablePage ? (
              <SearchBar
                value={search}
                onChange={handleInputChange}
                className={styles.desktopSearch}
              />
            ) : isAuth && !isMobile ? ( 
              <div className={styles.userProfile}>
                <Image
                  src={profileImage || ProfileImg}
                  height={35}
                  width={35}
                  alt={`${username}'s profile`}
                  priority
                  className={styles.profileImg}
                />
                {!isMobile && (
                  <div className={styles.userProfileInfo}>
                    <h1>{username}</h1>
                    <span>({getUserStatus()})</span>
                  </div>
                )}
              </div>
            ) : (
              <></>
            )}
          </div>

          {isAuth ? (
            <div
              className={styles.userSection}
              style={{ width: !isOpen || isMobile ? "auto" : "" }}
            >
              {(isMobile || isSearchablePage) && (
                <div className={styles.userProfile}>
                  <Image
                    src={profileImage || ProfileImg}
                    height={35}
                    width={35}
                    alt={`${username}'s profile`}
                    priority
                    className={styles.profileImg}
                  />
                  {!isMobile && (
                    <div className={styles.userProfileInfo}>
                      <h1>{username}</h1>
                      <span>[{getUserStatus()}]</span>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handleLogout}
                disabled={isLoading}
                className={styles.userButton}
                aria-label="Logout"
              >
                {isLoading ? (
                  <Loading />
                ) : (
                  <>
                  <LogoutIcon className={styles.userIcon} />
                  Logout
                  </>
                )}
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={styles.userButton}
              aria-label="Login"
            >
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  <UserIcon alt="user icon" className={styles.userIcon} />
                  Login
                </>
              )}
            </button>
          )}
        </div>
        {/* Mobile search bar */}
        {isSearchablePage && (
          <SearchBar
            value={search}
            onChange={handleInputChange}
            className={styles.mobileSearch}
          />
        )}
      </div>
 
    </>
  );
}