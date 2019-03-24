import { LitElement, html, css, unsafeCSS } from 'lit-element';
import '@vaadin/vaadin-split-layout';
import './components/SideMenu.js';
import './components/ContentArea';
import './components/FormPopup';
import { SharedStyles, SmallScreen } from './shared-styles.js';

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
    this.allContacts = [
      {
        first_name: "Tan",
        last_name: "Bui",
        phone_number: "+358 44 678 1234",
        email: "trungtanbui@gmail.com",
        address: "Joukahaisenkatu 3 20520",
        city: "Turku",
        state: "TUK",
        zipcode: "20540",
        image: 'tan-bui.jpg',
        bookmark: true
      },
      {
        first_name: "Tan1",
        last_name: "Bui1",
        phone_number: "+358 44 678 1234",
        email: "trungtanbui@gmail.com",
        address: "Joukahaisenkatu 3 20520",
        city: "Turku",
        state: "TUK",
        zipcode: "20540",
        image: 'tan-bui.jpg',
        bookmark: false
      },
      {
        first_name: "Tan2",
        last_name: "Bui2",
        phone_number: "+358 44 678 1234",
        email: "trungtanbui@gmail.com",
        address: "Joukahaisenkatu 3 20520",
        city: "Turku",
        state: "TUK",
        zipcode: "20540",
        image: 'user-image.jpg',
        bookmark: true
      }
    ];
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
      <vaadin-split-layout>
        <side-menu style="width: 25%;"></side-menu>
        <content-area style="width: 75%;" .allContacts="${this.allContacts}" .removeContact="${this._removeContact}"></content-area>
      </vaadin-split-layout>
      <form-popup></form-popup>
    `;
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        :host {
          display: block;
        }

        vaadin-split-layout {
          min-height: 100vh;
        }
      `,
      unsafeCSS(SmallScreen(`
        vaadin-split-layout side-menu {
          display:none;
        }
      `))
    ];
  }
}

customElements.define('phonebook-app', PhonebookApp);
