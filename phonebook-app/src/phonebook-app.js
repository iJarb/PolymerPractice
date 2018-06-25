import {LitElement, html} from '@polymer/lit-element';
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

    _render({data}) {
        return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <div class="main-page">
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
        
        <section id="content-area">
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
        </section>
      </div>
      <!--<my-calculator></-calculator>-->
    `;
    }

}

window.customElements.define('phonebook-app', PhonebookApp);
