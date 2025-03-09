import Title from "../title/Title";
import styles from "./applicationForm.module.css";

const SuccessForm = ({ onButtonClick }) => {
  return (
    <div className={styles.container}>
      <Title
        iconUrl="/info.webp"
        alt="Info icon"
        title="Thank You"
        description="Your information was submitted to our team of immigration attorneys. Expect an email from hello@tryalma.ai"
      />
      <button className={styles.button} onClick={onButtonClick}>
        Go Back to Homepage
      </button>
    </div>
  );
};

export default SuccessForm;
