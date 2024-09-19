import { useState, useEffect, useRef, useCallback } from "react";
import Contact from "../Contact/Contact";
import EditContactModal from "../EditContactModal/EditContactModal";
import styles from "./ContactList.module.css";
import toast from "react-hot-toast";

const ContactList = ({ contacts, onEditContact, onDeleteContact }) => {
  const [openContactId, setOpenContactId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [hiddenContacts, setHiddenContacts] = useState([]);
  const [deletedContact, setDeletedContact] = useState(null);
  const [isUndoVisible, setIsUndoVisible] = useState(false);
  const [deleteTimeout, setDeleteTimeout] = useState(null);
  const [selectedContacts, setSelectedContacts] = useState([]);

  const confirmDeleteRef = useRef(null);

  const handleCardClick = (id) => {
    setOpenContactId((prevId) => (prevId === id ? null : id));
  };

  const handleEditClick = (contact) => {
    setContactToEdit(contact);
    setIsModalOpen(true);
  };

  const handleSave = (updatedContact) => {
    onEditContact(updatedContact);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
  };

  const handleMultipleDeletes = async (contactsToDelete) => {
    for (let contact of contactsToDelete) {
      try {
        await onDeleteContact(contact.id);
        console.log(`Deleted contact: ${contact.name}`);
      } catch (error) {
        console.error(`Failed to delete contact: ${contact.name}`, error);
      }
    }
    toast.success("Contacts deleted successfully!");
  };

  const handleConfirmDelete = () => {
    if (contactToDelete && contactToDelete.id) {
      setHiddenContacts((prevHidden) => [...prevHidden, contactToDelete.id]);
      setDeletedContact(contactToDelete);
      setIsUndoVisible(true);

      const timeoutId = setTimeout(() => {
        handleMultipleDeletes([contactToDelete]);
        setIsUndoVisible(false);
        setDeletedContact(null);
      }, 5000);

      setDeleteTimeout(timeoutId);
      setContactToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setContactToDelete(null);
  };

  const handleUndoDelete = () => {
    if (deletedContact && deletedContact.id) {
      setHiddenContacts((prevHidden) =>
        prevHidden.filter((id) => id !== deletedContact.id)
      );
      setIsUndoVisible(false);
      clearTimeout(deleteTimeout);
      setDeletedContact(null);
      toast.success("Contact restored!");
    }
  };

  const handleClickOutside = useCallback(
    (e) => {
      if (
        contactToDelete &&
        confirmDeleteRef.current &&
        !confirmDeleteRef.current.contains(e.target)
      ) {
        setContactToDelete(null);
      }
    },
    [contactToDelete]
  );

  const handleSelectContact = (id) => {
    setSelectedContacts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((contactId) => contactId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelectedContacts = async () => {
    if (selectedContacts.length > 0) {
      const contactsToDelete = contacts.filter((contact) =>
        selectedContacts.includes(contact.id)
      );
      await handleMultipleDeletes(contactsToDelete);
      setSelectedContacts([]);
    } else {
      toast.error("No contacts for deletion.");
    }
  };

  useEffect(() => {
    if (contactToDelete) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contactToDelete, handleClickOutside]);

  useEffect(() => {
    return () => clearTimeout(deleteTimeout);
  }, [deleteTimeout]);

  const sortedContacts = contacts
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.list}>
      {selectedContacts.length > 0 && (
        <button
          onClick={handleDeleteSelectedContacts}
          className={`${styles.deleteSelectedButton} ${
            selectedContacts.length > 0 ? styles.show : ""
          }`}
        >
          Delete Selected Contacts ({selectedContacts.length})
        </button>
      )}

      <div className={styles.contactGrid}>
        {sortedContacts.map(
          (contact) =>
            !hiddenContacts.includes(contact.id) && (
              <div key={contact.id} className={styles.contactContent}>
                <input
                  type="checkbox"
                  checked={selectedContacts.includes(contact.id)}
                  onChange={() => handleSelectContact(contact.id)}
                  className={styles.checkbox}
                />
                <Contact
                  contact={contact}
                  isOpen={openContactId === contact.id}
                  onClick={() => handleCardClick(contact.id)}
                  onEdit={() => handleEditClick(contact)}
                  onDelete={() => handleDeleteClick(contact)}
                />
              </div>
            )
        )}
      </div>

      {isModalOpen && contactToEdit && (
        <EditContactModal
          contact={contactToEdit}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}

      {contactToDelete && (
        <div className={styles.confirmDelete} ref={confirmDeleteRef}>
          <p>Do you want to delete this contact {contactToDelete.name}?</p>
          <div className={styles.containerBtn}>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}

      {isUndoVisible && (
        <div className={styles.undoDelete}>
          <button onClick={handleUndoDelete}>Undo Delete</button>
        </div>
      )}
    </div>
  );
};

export default ContactList;
