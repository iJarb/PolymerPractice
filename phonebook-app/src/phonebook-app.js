import { LitElement, html } from 'lit-element';
import './components/SideMenu.js';
import './components/ContentArea';
import './components/FormPopup';

/**
 * `phonebook-app`
 * A very simple app with lit-element.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PhonebookApp extends LitElement {

  static get properties() {
    return {
      allContacts: { type: Array }
    };
  }

  constructor() {
    super();
    this.allContacts = [{
      address_1: "Student village",
      address_2: "Joukahaisenkatu 3 20520",
      city: "Turku",
      favorite: true,
      first_name: "Tan",
      last_name: "Bui",
      state: "TUK",
      zipcode: "20540"
    }];
    window.addEventListener('save-contact', (e) => this._saveContact(e));
    window.addEventListener('remove-contact', (e) => this._removeContact(e));
    window.addEventListener('edit-contact', (e) => this._editContact(e));
  }

  _editContact(e) {
    window.dispatchEvent(new CustomEvent('open-edit-contact', { detail: this.allContacts[e.detail] }));
  }

  _saveContact(e) {
    if (e.detail.id) {
      let contact = this.allContacts[e.detail.id];
      const data = e.detail.data;
      Object.keys(data).forEach((key) => {
        contact[key] = data[key]
      });
      this._refreshContacts();
      return;
    }

    function immutablePush(arr, newEntry) {
      let v = {};
      newEntry = Object.assign(v, newEntry);
      return [...arr, newEntry]
    }
    this.allContacts = immutablePush(this.allContacts, e.detail);
  }

  _removeContact(e) {
    const index = parseInt(e.detail);
    function immutableRemove(arr, index) {
      return arr.slice(0, index).concat(arr.slice(index + 1));
    }
    this.allContacts = immutableRemove(this.allContacts, index);
    console.log("Removed: " + index);
  }

  _refreshContacts() {
    this.allContacts = this.allContacts.concat([]);
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
        }

        .main-page {
            display: grid;
            grid-template-columns: 250px 1fr;
        }
      </style>
      <div class="main-page">
        <side-menu></side-menu>
        <content-area .allContacts="${this.allContacts}" .removeContact="${this._removeContact}"></content-area>
        <form-popup></form-popup>
      </div>
    `;
  }
}

customElements.define('phonebook-app', PhonebookApp);
