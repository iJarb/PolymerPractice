import { LitElement, html } from 'lit-element';

export default class ContactsList extends LitElement {

  static get properties() {
    return {
      allContacts: { type: Array }
    }
  }

  constructor() {
    super();
    this.displayAllContacts = this.displayAllContacts.bind(this);
  }

  _removeContact(e) {
    window.dispatchEvent(new CustomEvent('remove-contact', { detail: e.currentTarget.id }));
  }

  _editContact(e) {
    window.dispatchEvent(new CustomEvent('edit-contact', { detail: e.currentTarget.id }));
  }

  displayAllContacts() {
    return this.allContacts.map((contact, index) => {
      return html`
            <div class="contact" .id="${index}" @click="${this._editContact}">
              <div class="user-img"></div>
              <div class="fullname">
                <span class="text">${contact.first_name} ${contact.last_name}</span>
                <span class="sub">Full name</span>
              </div>
              <div class="number">
                <span class="text">${contact.address_1}</span>
                <span class="sub">Address</span>
              </div>
              <div class="state">
                <span class="text">${contact.state}</span>
                <span class="sub">State</span>
              </div>
              <div class="category">
                <span class="text">${contact.zipcode}</span>
                <span class="sub">Zipcode</span>
              </div>
              <div class="delete-btn">
                <svg .id="${index}" @click="${this._removeContact}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
                  data-prefix="far" data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" viewBox="0 0 512 512">
                  <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" /></svg>
              </div>
            </div>
        `;
    });
  }

  render() {
    return html`
      <style>
        @import '/assets/css/global.css';
        @import '/assets/css/ContactList.css';
      </style>
        <section class="contacts">
            <h2>Contacts</h2>
            ${this.displayAllContacts()}
        </section>
    `;
  }
}

window.customElements.define('contacts-list', ContactsList);
