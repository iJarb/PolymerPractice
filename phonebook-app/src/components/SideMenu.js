import { LitElement, html } from 'lit-element';

export default class SideMenu extends LitElement {

  _addContact() {
    window.dispatchEvent(new CustomEvent('toggle-add-form'));
  }

  render() {
    return html`
      <style>
        @import '/assets/css/global.css';
        :host {
          display: block;
        }

        #side-menu {
            background: #323759;
            height: 100%;
            padding: 50px 20px;
        }

        .logo{
          text-align: center;
        }

        .title {
            font-weight: 700;
            color: #ccced7;
            margin: 1rem 0;
        }

        #side-menu nav a {
            color: #ccced7;
            text-decoration: none;
            text-transform: capitalize;
            display: block;
            padding: 10px 10px 10px 0;
        }

        #side-menu nav a span.icon {
            padding: 10px 10px 10px 0;
        }
      </style>

        <section id="side-menu">
          <div class="logo">
            <a href="/"><img src="/assets/img/logo.png" width="80px" height="80px" /></a>
          </div>
          <div class="menu">
            <div class="title">Contacts</div>
            <nav>
              <a href="#" @click="${this._addContact}"><span class="icon"> + </span> Add contact</a>
            </nav>
          </div>
        </section>
    `;
  }
}

customElements.define('side-menu', SideMenu);
