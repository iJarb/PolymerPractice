import { LitElement, html } from 'lit-element';
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
            address_1: "Student village",
            address_2: "Joukahaisenkatu 3 20520",
            city: "Turku",
            favorite: true,
            first_name: "Tan",
            last_name: "Bui",
            state: "TUK",
            zipcode: "20540"
        }];
        window.addEventListener('toggle-add-form', () => this.togglePopup());
        window.addEventListener('save-contact', (e) => this.saveContact(e));
        window.addEventListener('remove-contact', (e) => this.removeContact(e));
        window.addEventListener('edit-contact', (e) => this.editContact(e));
    }

    togglePopup() {
        this.popupOpen = !this.popupOpen;
    }

    editContact(e) {
      // todo: show the form with selected contact detail
      console.log(e.detail);
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

    removeContact(e) {
        const index = parseInt(e.detail);
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
