import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchContacts, deleteContact } from "../../redux/contacts/operations";
import { selectFilteredContacts } from "../../redux/contacts/selectors";
import styles from "./ContactsPage.module.css";

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);

  useEffect(() => {
    if (contacts.length === 0) {
      dispatch(fetchContacts());
    }
  }, [dispatch, contacts.length]);

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleEditContact = (contact) => {
    console.log("Edit contact:", contact);
  };

  return (
    <div className={styles.contactsPage}>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <ContactList
        contacts={contacts}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default ContactsPage;
