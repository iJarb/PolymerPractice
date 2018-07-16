import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * @customElement
 * @polymer
 */
class MyProfileNavigator extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      a {
        text-decoration: none;
      }
      ul li {
        display: inline-block;
        list-style: none;
      }
      :host(.list) ul li {
        display: block;
      }
    </style>

    <dom-if if="[[shouldRender]]">
      <template>
        <ul>
          <li><a name="home" href="/">Home</a><br></li>
          <li><a name="login" href="/login">Log in</a></li>
          <li><a name="register" href="/register">Register</a></li>
        </ul>
      </template>
    </dom-if>
`;
  }

  static get is() { return 'my-profile-navigator'; }

  static get properties() {
      return {
          shouldRender: Boolean
      };
  }
}

window.customElements.define(MyProfileNavigator.is, MyProfileNavigator);
