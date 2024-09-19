import RegistrationForm from "../../components/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.css";

const RegistrationPage = () => {
  return (
    <div className={styles.container}>
      <RegistrationForm />
    </div>
  );
};

export default RegistrationPage;
