import Image from "next/image";
import styles from "./header.module.css";
import { useRouter } from "next/navigation";

export const Header = () => {
  const router = useRouter();
  const handleAdminPanelClick = () => {
    router.push("/admin");
  };
  return (
    <div className={styles.header}>
      <Image
        className={styles.logo}
        src="/header.webp"
        alt="logo"
        width={450}
        height={450}
      />
      <div className={styles.title}>
        <div className={styles.text}>
          Get an assessment <br />
          of your immigration case
        </div>
      </div>
      <button
        className={styles.adminPanelButton}
        onClick={handleAdminPanelClick}
      >
        Admin Panel
      </button>
    </div>
  );
};
