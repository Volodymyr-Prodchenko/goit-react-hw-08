import { createSelector } from "reselect";

export const selectAllContacts = (state) => state.contacts.items;
export const selectFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectAllContacts, selectFilter],
  (contacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(normalizedFilter) ||
        contact.number.toLowerCase().includes(normalizedFilter)
    );
  }
);

export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectSelectedContact = (state) => state.contacts.selectedContact;
export const selectIsModalOpen = (state) => state.contacts.isModalOpen;
