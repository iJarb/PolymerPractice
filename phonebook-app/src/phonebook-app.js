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
        this.addContactClick = this.addContactClick.bind(this);
        this.popupOpen = false;
    }

    static get properties() {
        return {
            data: String
        };
    }

    addContactClick() {
        this.popupOpen = !this.popupOpen;
        console.log(this.popupOpen);
        this.requestRender();
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
        <side-menu addContactClick="${this.addContactClick}"></side-menu>
        <content-area popupOpen="${this.popupOpen}"></content-area>
      </div>
    `;
    }

}

window.customElements.define('phonebook-app', PhonebookApp);
