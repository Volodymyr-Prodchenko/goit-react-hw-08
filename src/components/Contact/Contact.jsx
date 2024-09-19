import styles from "./Contact.module.css";

const Contact = ({ contact, onEdit, onDelete, isOpen, onClick }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header} onClick={onClick}>
        <p className={styles.name}>{contact.name}</p>
        <button className={styles.arrow}>{isOpen ? "▲" : "▼"}</button>
      </div>
      {isOpen && (
        <div className={styles.details}>
          <p>{contact.number}</p>{" "}
          <div className={styles.containerBtn}>
            <button onClick={() => onEdit(contact)}>Edit</button>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
