import { GlobalStyle } from './GlobalStyle';
import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm'
import { Contacts } from "./Contacts/Contacts";
import { nanoid } from 'nanoid';
import Filter from "./Filter/Filter";


export class App extends Component {
    state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  componentDidMount() {
    
    const contact = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contact);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts})
    }
  }

  componentDidUpdate(prevProps, prevState,) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }

  }

    addContact = contact => {
    const isInContacts = this.state.contacts.some(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );

    if (isInContacts) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    this.setState(prevState => ({
      contacts: [{ id: nanoid(), ...contact }, ...prevState.contacts, ],
    }));
  };

    changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

    getVisibleContacts = () => {
    const { filter, contacts, } = this.state;
    const normalizedFilter = filter.toLowerCase();
      
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  removeContact = (contactId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(({ id }) => id !== contactId),
      };
    });
  };
  
  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    
    return (
      <div >
        <h1>Phonebook</h1>
        <GlobalStyle />
        <ContactForm
          onSubmit={this.addContact}/>

        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <Filter value={filter} onChangeFilter={this.changeFilter} />
        ) : (
          'Your phonebook is empty. Add first contact!'
        )}
        {this.state.contacts.length > 0 && (
          <Contacts
            contacts={visibleContacts}
            onRemoveContact={this.removeContact}
          />
        )}
      </div>
    );
  };
};