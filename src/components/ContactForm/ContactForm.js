import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './ContactForm.module.css';
import { addContact } from 'redux/operations';

export default function ContactForm() {
  const contactsLict = useSelector(state => state.contacts);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();

  const handleInputChange = eve => {
    const target = eve.currentTarget.name;
    switch (target) {
      case 'name':
        setName(eve.currentTarget.value);
        break;

      case 'number':
        setPhone(eve.currentTarget.value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = eve => {
    eve.preventDefault();
    const contact = { name, phone };

    contactsLict.contacts.items.map(contact => contact.name).includes(name)
      ? alert(`${name} is already in contacts.`)
      : dispatch(addContact(contact));
    inputReset();
  };

  const inputReset = () => {
    setName('');
    setPhone('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} name="Name">
        Name
        <input
          className={css.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          value={name}
          required
          onChange={handleInputChange}
        />
      </label>
      <label className={css.label} name="Namber">
        Number
        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          value={phone}
          required
          onChange={handleInputChange}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
}
