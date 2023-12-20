import React from 'react';
import css from './Filter.module.css';

export default function Filter({ value, onChangeFilter }) {
  return (
    <div className={css.Filter}>
      Find contacts by name
      <input
        className={css.Filter__input}
        type="text"
        value={value}
        onChange={onChangeFilter}
      />
    </div>
  );
}