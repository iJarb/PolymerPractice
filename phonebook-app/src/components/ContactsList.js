import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { SharedStyles, SmallScreen, XSmallScreen } from '../shared-styles';

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
    window.dispatchEvent(new CustomEvent('show-form', {
      detail: {
        mode: 'edit',
        id: e.currentTarget.id,
        data: this.allContacts[e.currentTarget.id]
      }
    }));
  }

  displayAllContacts() {
    return this.allContacts.map((contact, index) => {
      return html`
            <div class="delete-btn">
              <svg .id="${index}" @click="${this._removeContact}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="far"
                data-icon="times-circle" class="svg-inline--fa fa-times-circle fa-w-16" role="img" viewBox="0 0 512 512">
                <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" /></svg>
            </div>
            <div class="contact" .id="${index}" @click="${this._editContact}">
              <div class="user-img" style="background-image: url('/assets/img/${contact.image ? contact.image : 'user-image.jpg'}')"></div>
              <div class="fullname">
                <span class="text">${contact.first_name} ${contact.last_name}</span>
                <span class="sub">Full name</span>
              </div>
              <div class="number">
                <span class="text">${contact.phone_number}</span>
                <span class="sub">Phone</span>
              </div>
              <div class="email">
                <span class="text">${contact.email}</span>
                <span class="sub">Email</span>
              </div>
              <div class="address">
                <span class="text">${contact.address}</span>
                <span class="sub">Address</span>
              </div>
            </div>
        `;
    });
  }

  render() {
    return html`
      <section class="contacts">
          <h2>Contacts</h2>
          ${this.displayAllContacts()}
      </section>
    `;
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          display: block;
        }
        h2 {
          color: #3e4162;
          font-weight: 300;
          margin: 0;
          margin-top: 4rem;
        }
        .contact {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr 3fr 3fr 4fr;
          color: #3d4060;
          padding: 1rem;
          border-radius: 1rem;
          transition: all 0.1s ease-in-out;
          cursor: pointer;
        }
        .contact:hover {
          -webkit-box-shadow: 0px 4px 7.7rem -1.7rem rgba(0, 0, 0, 0.36);
          -moz-box-shadow: 0px 4px 7.7rem -1.7rem rgba(0, 0, 0, 0.36);
          box-shadow: 0px 4px 7.7rem -1.7rem rgba(0, 0, 0, 0.36);
        }
        .contact .user-img {
          height: 4rem;
          width: 4rem;
          background-size: cover;
          background-position: center center;
          border-radius: 1rem;
        }
        .contact .fullname {
          color: #3d4060;
          font-weight: 700;
          text-transform: capitalize;
        }

        .text {
          display: block;
          text-align: center;
        }
        .sub {
          display: block;
          color: #b4b5c5;
          font-weight: 300;
          font-size: 1.1rem;
          text-align: center;
          margin: .5rem 0;
        }
        .fullname, .address, .zipcode, .number, .email {
          font-size: 1.7rem;
          font-weight: 400;
        }
        .delete-btn {
          cursor: pointer;
          text-align: right;
          z-index: 10;
          display: block;
          transition: all 0.3s ease-in-out;

          position: relative;
          top: 3rem;
          right: 1rem;
        }
        .delete-btn svg {
          width: 1.5rem;
          height: 1.5rem;
          transition: all 0.3s ease-in-out;
        }
        .delete-btn svg:hover {
          width: 1.8rem;
          height: 1.8rem;
          color: red;
        }
      `,
      unsafeCSS(SmallScreen(`
        .contact .user-img, .sub, .address {
          display: none;
        }
        .contact {
          grid-template-columns: 2fr 3fr 3fr;
        }
      `)),
      unsafeCSS(XSmallScreen(`
        .email {
          display: none;
        }
        .contact {
          grid-template-columns: 2fr 5fr;
        }
      `))
    ];
  }
}

window.customElements.define('contacts-list', ContactsList);
