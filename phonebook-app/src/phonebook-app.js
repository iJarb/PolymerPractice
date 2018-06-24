import { LitElement, html } from '@polymer/lit-element';
import {} from './my-calculator.js';

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
      data: String
    };
  }

  _render({ data }) {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello ${data}!</h2>
      <my-calculator></-calculator>
    `;
  }

}

window.customElements.define('phonebook-app', PhonebookApp);
