import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to my Phonebook!</h1>
      <p className={styles.description}>
        Please register your account or log In
      </p>
    </div>
  );
};

export default HomePage;
