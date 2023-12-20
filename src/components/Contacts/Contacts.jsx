import React from 'react';
import css from './Contacts.module.css';

export const Contacts = ({ contacts, onRemoveContact }) => (
  <ul className={css.ContactsList}>
    {contacts.map(contact => (
      <li className={css.ContactsList__item} key={contact.id}>
        {contact.name + ' : ' + contact.number}
        {
          <button
            className={css.ContactsList__button}
            type="button"
            name="delete"
            onClick={() => onRemoveContact(contact.id)}
          >
            delete
          </button>
        }
      </li>
    ))}
  </ul>
);