import axios from 'axios';

const API_URL = 'http://localhost:5000/api/contacts';

// Get auth token from local storage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

// Create config with auth token
const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all contacts
export const getContacts = async () => {
  const response = await axios.get(API_URL, getConfig());
  return response.data;
};

// Create a new contact
export const createContact = async (contactData) => {
  const response = await axios.post(API_URL, contactData, getConfig());
  return response.data;
};

// Get a contact by ID
export const getContactById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getConfig());
  return response.data;
};

// Update a contact
export const updateContact = async (id, contactData) => {
  const response = await axios.put(`${API_URL}/${id}`, contactData, getConfig());
  return response.data;
};

// Delete a contact
export const deleteContact = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getConfig());
  return response.data;
};