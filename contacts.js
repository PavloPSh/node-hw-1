const fs = require('fs/promises');
const path = require('path');

const { v4: uuidv4 } = require('uuid')


const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    
    const parsedContacts = contacts.map(({ id, name, email, phone }) => ({
        name,
        id,
        email,
        phone,
    }))
    return parsedContacts;
};

const getContactById = async (id) => {
    const contacts = await listContacts();
    const result = contacts.find(contact => contact.id === id);
    if (!result) {
        return null;
    }
    return result;
};

const addContact = async (newData) => {
    const contacts = await listContacts();
    const newContacts = { ...newData, id: uuidv4() };
    contacts.push(newContacts);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContacts;
};

const removeContact = async (id) => {
    const contacts = await listContacts();
    const removedContact = contacts.filter(contact => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(removedContact));
    return removedContact;
};




module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};