import {LitElement, html} from '@polymer/lit-element';
import SideMenu from './components/SideMenu.js';
import ContentArea from './components/ContentArea';

/**
 * `phonebook-app`
 * A very simple app with lit-element.
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PhonebookApp extends LitElement {
    constructor() {
        super();
        this.togglePopup = this.togglePopup.bind(this);
        this.popupOpen = false;
        this.allContacts = [];
        this.saveContact = this.saveContact.bind(this);
    }

    static get properties() {
        return {
            popupOpen: Boolean,
            allContacts: Array
        };
    }

    togglePopup() {
        this.popupOpen = !this.popupOpen;
        console.log(this.popupOpen);
        //this.requestRender(); //popupOpen is a property so don't need to call requestRender()
    }

    saveContact(contact, event) {
        event.preventDefault();

        function immutablePush(arr, newEntry){
            let v = {};
            newEntry = Object.assign(v, newEntry);
            return [ ...arr, newEntry ]
        }
        this.allContacts = immutablePush(this.allContacts, contact);
        console.log(this.allContacts);
    }

    _render({data}) {
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
        <side-menu togglePopup="${this.togglePopup}"></side-menu>
        <content-area popupOpen="${this.popupOpen}" togglePopup="${this.togglePopup}" saveContact="${this.saveContact}"></content-area>
      </div>
    `;
    }

}

window.customElements.define('phonebook-app', PhonebookApp);
