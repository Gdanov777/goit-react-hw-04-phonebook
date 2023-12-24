import React from "react";
import { nanoid } from 'nanoid';
import css from "./ContactForm.module.css";

export class ContactForm extends React.Component {
  
    state = {
    name: '',
    number: '',
    
  };

    nameInputId = nanoid();
  numberInputId = nanoid();

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit({ name: this.state.name, number: this.state.number });
    
    this.reset();
  };


    handleChange = e => {
      const { name, value} = e.target;
    this.setState({ [name]: value });
  };
    
    reset = () => {
        this.setState({number: '',
    name: ''})
    }

  render() {
  
    return (
      <form onSubmit={this.handleSubmit} className={css.ContactForm}>
        <label htmlFor={this.nameInputId} className={css.ContactForm__label}>
          Name
          <input
            className={css.ContactForm__input}
            type="text"
            name='name'
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>

        <label htmlFor={this.numberInputId} className={css.ContactForm__label}>
          Number
          <input
            className={css.ContactForm__input}
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          
        </label>

        <button type="submit" className={css.ContactForm__button}>Add contact </button>
      </form>
    );
  }
}