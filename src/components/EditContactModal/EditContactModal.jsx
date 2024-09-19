import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateContact, fetchContacts } from "../../redux/contacts/operations";
import styles from "./EditContactModal.module.css";

const EditContactModal = ({ contact, onClose }) => {
  const [name, setName] = useState(contact?.name || "");
  const [number, setnumber] = useState(contact?.number || "");
  const dispatch = useDispatch();

  useEffect(() => {
    if (contact) {
      setName(contact.name || "");
      setnumber(contact.number || "");
    }
  }, [contact]);

  const handleSave = async () => {
    if (!name || !number) {
      console.error("Both name and number are required fields.");
      return;
    }
    console.log("Sending PATCH request with:", {
      id: contact.id,
      name,
      number,
    });

    try {
      await dispatch(updateContact({ id: contact.id, name, number }));
      await dispatch(fetchContacts());
      onClose();
    } catch (error) {
      console.error("Failed to update contact:", error);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Edit Contact</h2>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className={styles.label}>
          Phone
          <input
            className={styles.input}
            type="tel"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
          />
        </label>
        <div className={styles.buttons}>
          <button className={styles.buttonSave} onClick={handleSave}>
            Save
          </button>
          <button className={styles.buttonCancel} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
