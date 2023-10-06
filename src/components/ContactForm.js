import React, { Component } from 'react';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ number: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, number } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      alert('Name and number cannot be empty');
      return;
    }

    this.props.onAddContact(name, number);

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="form">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleNameChange}
            className="form-input"
          />
          <label htmlFor="number" className="form-label">Number</label>
          <input
            type="tel"
            id="number"
            name="number"
            value={number}
            onChange={this.handleNumberChange}
            className="form-input"
          />
          <button type="submit" className="form-button">Add contact</button>
        </form>
      </div>
    );
  }
}

export default ContactForm;
