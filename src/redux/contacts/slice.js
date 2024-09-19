import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContacts,
  addContact,
  deleteContact,
  updateContact,
} from "./operations";

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    selectedContact: null,
    isModalOpen: false,
  },
  reducers: {
    clearContacts: (state) => {
      state.items = [];
    },
    setSelectedContact: (state, action) => {
      state.selectedContact = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;

        const uniqueContacts = payload.filter(
          (newContact) =>
            !state.items.some(
              (existingContact) => existingContact.id === newContact.id
            )
        );

        state.items = [...state.items, ...uniqueContacts];
      })
      .addCase(fetchContacts.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        state.items = state.items.filter((contact) => contact.id !== payload);
      })
      .addCase(updateContact.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(
          (contact) => contact.id === payload.id
        );
        if (index !== -1) {
          state.items[index] = payload;
        }
      });
  },
});

export const { setSelectedContact, openModal, closeModal, clearContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;
