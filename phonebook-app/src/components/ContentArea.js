import { LitElement, html } from 'lit-element';
import ContactsList from './ContactsList.js';
import FavoritesList from './FavoritesList.js';

export default class ContentArea extends LitElement {

  static get properties() {
    return {
      allContacts: { type: Array }
    }
  }

  render() {
    return html`
      <style>
        @import '/assets/css/global.css';
        :host {
          display: block;
        }
        #content-area {
            background: #fcfdff;
            padding: 50px 80px;
        }
      </style>
    <section id="content-area">
        <favorites-list .allContacts="${this.allContacts}"></favorites-list>
        <contacts-list .allContacts="${this.allContacts}"></contacts-list>
    </section>
    `;
  }
}

window.customElements.define('content-area', ContentArea);
