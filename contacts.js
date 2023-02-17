const fs = require('fs/promises');
const path = require('path');

const { v4: uuidv4 } = require('uuid')


const contactsPath = path.resolve('./db/contacts.json');

const listContacts = async () => {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data);
    
        const parsedContacts = contacts.map(({ id, name, email, phone }) => ({
            name,
            id,
            email,
            phone,
        }));
        return parsedContacts;
    } catch (error) {
        console.log(error);
    }
    
};

const getContactById = async (id) => {
    try {
        const contacts = await listContacts();
        const result = contacts.find(contact => contact.id === id);
            if (!result) {
                return null;
            }
        return result;
    } catch (error) {
        console.log(error)
    };
    
};

const addContact = async (newData) => {

    try {
        const contacts = await listContacts();
        const newContacts = { ...newData, id: uuidv4() };
        contacts.push(newContacts);
        await fs.writeFile(contactsPath, JSON.stringify(contacts));
        return newContacts;
    } catch (error) {
        console.error(error);
    }
    
};

const removeContact = async (id) => {

    try {
        const contacts = await listContacts();
        const removedContact = contacts.filter(contact => contact.id !== id);
        await fs.writeFile(contactsPath, JSON.stringify(removedContact));
        return removedContact;
    } catch (error) {
        console.error(error)
    }
    
};




module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};