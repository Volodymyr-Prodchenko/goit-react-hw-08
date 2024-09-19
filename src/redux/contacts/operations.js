import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

axios.defaults.baseURL = "https://connections-api.goit.global";

export const addContact = createAsyncThunk(
  "contacts/add",
  async (contact, thunkAPI) => {
    try {
      const contactData = {
        name: contact.name,
        number: contact.number,
      };
      const { data } = await axios.post("/contacts", contactData, {
        headers: {
          Authorization: `Bearer ${thunkAPI.getState().auth.token}`,
        },
      });
      toast.success("Contact added successfully!");
      return data;
    } catch (error) {
      toast.error("Failed to add contact.");
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      if (response.status === 404) {
        throw new Error("Contact not found");
      }
      return id;
    } catch (error) {
      console.error(
        "Error deleting contact:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/update",
  async (contact, thunkAPI) => {
    try {
      const { data } = await axios.patch(`/contacts/${contact.id}`, {
        name: contact.name,
        number: contact.number,
      });
      return data;
    } catch (error) {
      console.error(
        "Error updating contact:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
