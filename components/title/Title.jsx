import Image from "next/image";
import styles from "./title.module.css";

const Title = ({ iconUrl, title, alt, description }) => {
  return (
    <div className={styles.wrapper}>
      <Image
        className={styles.icon}
        alt={alt}
        src={iconUrl}
        width={64}
        height={64}
      />
      <div className={styles.title}>{title}</div>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
};

export default Title;
