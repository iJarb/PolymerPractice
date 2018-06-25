import {LitElement, html} from '@polymer/lit-element';

export default class SideMenu extends LitElement {

    _render({}) {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
        <section id="side-menu">
          <div class="logo"></div>
          <div class="menu">
            <div class="title">Contacts</div>
            <nav>
              <a href="#">Add contact</a>
              <a href="#">Add contact</a>
              <a href="#">Add contact</a>
              <a href="#">Add contact</a>
            </nav>
          </div>
        </section>
    `;
    }
}

window.customElements.define('side-menu', SideMenu);
