import {LitElement, html} from '@polymer/lit-element';

export default class ContactsList extends LitElement {
    _render({}) {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
        <section class="contacts">
            <h2>Contacts</h2>
            <div class="contact">
                <div class="user-img"></div>
                <div class="fullname">Tan Bui</div>
                <div class="number">123 - 456 - 789</div>
                <div class="state">TUR</div>
                <div class="category">Work</div>
            </div> 
        </section>
    `;
    }
}

window.customElements.define('contacts-list', ContactsList);
