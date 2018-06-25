import {LitElement, html} from '@polymer/lit-element';
import ContactsList from './ContactsList.js'

export default class ContentArea extends LitElement {
    _render({}) {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
    <section id="content-area">
        <contacts-list></contacts-list>
    </section>
    `;
    }

}

window.customElements.define('content-area', ContentArea);
