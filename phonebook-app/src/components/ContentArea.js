import { LitElement, html, css, unsafeCSS } from 'lit-element';
import './ContactsList.js';
import './BookmarkList.js';
import { SharedStyles, SmallScreen } from '../shared-styles';

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
            padding: 5rem 8rem;
        }
      `,
      unsafeCSS(SmallScreen(`
        #content-area {
          padding: 0 3rem;
        }
      `))
    ];
  }
}

window.customElements.define('content-area', ContentArea);
