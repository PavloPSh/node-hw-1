const fs = require('fs/promises');
const { Command } = require('commander');
const contactsOperations = require('./contacts');

const program = new Command();

program
  .option('-a, --action <type>', "choose action")
  .option('-id, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();



const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;
    
    case "get":
      const contact = await contactsOperations.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id:${id} not found`)
      };
      console.table(contact);
      break;
    
    case "add":
      const addContacts = await contactsOperations.addContact({ name, email, phone });
      console.table(addContacts);
      break;
    
    case "remove":
      const removeContacts = await contactsOperations.removeContact(id);
      console.table(removeContacts);
      break;
    
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};


invokeAction(argv);
    



