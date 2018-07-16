import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class MyProfile404 extends PolymerElement {
  static get template() {
    return html`
        404 - Page not found!
`;
  }

  static get is() {
      return 'my-profile-404';   // must be same as dom-module id
  }
}

customElements.define(MyProfile404.is, MyProfile404);
