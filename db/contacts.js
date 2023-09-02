const fs = require("fs/promises");
const path = require('path');

const contactsPath = path.join(__dirname, "contacts.json");

const { nanoid } = require('nanoid');

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const addContact = async (data) => {
  const newContact = {
    ...data,
    id: nanoid(),
  };

  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await fs.readFile(contactsPath);
  const contact = contacts.filter((contact) => contact.id !== contactId);
  return JSON.parse(contact) || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
