import { LitElement, html, css } from 'lit-element';
import ContactsList from './ContactsList.js';
import BookmarkList from './BookmarkList.js';
import { SharedStyles } from '../shared-styles';

export default class ContentArea extends LitElement {

  static get properties() {
    return {
      allContacts: { type: Array }
    }
  }

  render() {
    return html`
    <section id="content-area">
        <bookmark-list .allContacts="${this.allContacts}"></bookmark-list>
        <contacts-list .allContacts="${this.allContacts}"></contacts-list>
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
        #content-area {
            background: #fcfdff;
            padding: 50px 80px;
        }
      `
    ];
  }
}

window.customElements.define('content-area', ContentArea);
