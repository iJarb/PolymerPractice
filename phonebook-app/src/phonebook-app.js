import { LitElement, html } from '@polymer/lit-element';
import './components/SideMenu.js';
import './components/ContentArea';

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
            popupOpen: { type: Boolean},
            allContacts: { type: Array}
        };
    }

    constructor() {
        super();
        this.popupOpen = false;
        this.allContacts = [{
            address_1: "6D, 6, Yo-kyla",
            address_2: "second address",
            city: "Turku",
            favorite: true,
            first_name: "Tan",
            last_name: "Bui",
            state: "TUK",
            zipcode: "20540"
        }];
        this.saveContact = this.saveContact.bind(this);
        this.removeContact = this.removeContact.bind(this);
        window.addEventListener('toggleAddForm', () => this.togglePopup());
        window.addEventListener('saveContact', (e) => this.saveContact(e));
    }

    togglePopup() {
        this.popupOpen = !this.popupOpen;
    }

    saveContact(e) {
        function immutablePush(arr, newEntry) {
            let v = {};
            newEntry = Object.assign(v, newEntry);
            return [...arr, newEntry]
        }
        this.allContacts = immutablePush(this.allContacts, e.detail);
        this.togglePopup();
    }

    removeContact(index) {
        function immutableRemove(arr, index) {
            return arr.slice(0, index).concat(arr.slice(index + 1));
        }
        this.allContacts = immutableRemove(this.allContacts, index);
        console.log("Removed: " + index);
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
        <content-area .popupOpen="${this.popupOpen}"
            .allContacts="${this.allContacts}"
            .removeContact="${this.removeContact}">
        </content-area>
      </div>
    `;
    }
}

customElements.define('phonebook-app', PhonebookApp);
