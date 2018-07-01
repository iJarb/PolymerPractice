import {LitElement, html} from '@polymer/lit-element';
import ContactsList from './ContactsList.js';
import FavoritesList from './FavoritesList.js';
import FormPopup from './FormPopup';

export default class ContentArea extends LitElement {

    static get properties() {
        return {
            popupOpen: Boolean
        }
    }

    _render({}) {
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
        <form-popup popupOpen="${this.popupOpen}"></form-popup>
        <favorites-list></favorites-list>
        <contacts-list></contacts-list>
    </section>
    `;
    }

}

window.customElements.define('content-area', ContentArea);
