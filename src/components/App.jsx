import React, { Component } from 'react';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    number: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;

    if (this.isContactExist(name)) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const contact = { id: this.generateId(), name, number };
    this.setState((prevState) => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  isContactExist = (name) => {
    const { contacts } = this.state;
    return contacts.some((contact) => contact.name === name);
  };

  generateId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  handleFilterChange = (filter) => {
    this.setState({ filter });
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ number: e.target.value });
  };

  render() {
    const { name, number, contacts, filter } = this.state;

    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <div className="container">
          <p>Name</p>
          <form onSubmit={this.addContact} className="form">
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleNameChange}
              className="form-input"
            />
            <p>Number</p>
            <input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleNumberChange}
              className="form-input"
            />
            <button type="submit" className="form-button">
              Add Contact
            </button>
          </form>
        </div>
        <h2>Contacts</h2>
        <p>Find contacts by name</p>
        <input
          type="text"
          value={filter}
          onChange={(e) => this.handleFilterChange(e.target.value)}
          className="form-input"
        />
        <ul>
          {filteredContacts.map((contact) => (
            <li key={contact.id} className="contact-item">
              {contact.name}: {contact.number}
              <button
                className="delete-button"
                onClick={() => this.deleteContact(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
