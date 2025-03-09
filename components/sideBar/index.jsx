"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./SideBar.module.css";
import Link from "next/link";

const SideBar = () => {
  const router = useRouter();
  const handleLogoutClick = () => {
    localStorage.removeItem("auth");
    router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <Link href="/">
        <Image alt="Alma logo" src="/alma.jpeg" width={123} height={62} />
      </Link>

      <div className={styles.menu}>
        <div className={`${styles.menuItem} ${styles.activeMenuItem}`}>
          Leads
        </div>
        <div className={styles.menuItem}>Settings</div>
      </div>
      <button className={styles.logoutButton} onClick={handleLogoutClick}>
        Log out
      </button>
    </div>
  );
};

export default SideBar;
