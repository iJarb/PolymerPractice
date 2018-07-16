import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/iron-form/iron-form.js';
import '../../../@polymer/paper-input/paper-input.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../vaadin-text-field/vaadin-text-field.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
class MyProfileRegister extends PolymerElement {
  static get template() {
    return html`
    <style>
        paper-button {
            font-family: 'Roboto', 'Noto', sans-serif;
            font-weight: normal;
            font-size: 14px;
            -webkit-font-smoothing: antialiased;
        }
        paper-button.indigo {
            background-color: var(--paper-indigo-500);
            color: white;
            --paper-button-raised-keyboard-focus: {
                background-color: var(--paper-pink-a200) !important;
                color: white !important;
            };
        }

        form {
            margin: 20px 0;
        }
        .form-item {
            margin-bottom: 15px;
        }
    </style>
    <my-profile-data id="myData"></my-profile-data>
    <iron-form id="registerForm">
        <form method="post">
            <div class="form-item">
                <vaadin-text-field label="User Name" minlength="4" maxlength="8" required="" pattern="^\\w+\$" value="TanBui" name="username"></vaadin-text-field>
                <br><span>* from 4 to 8 characters without spaces</span>
            </div>
            <div class="form-item">
                <vaadin-text-field label="Email" required="" value="tan@vaadin.com" name="email"></vaadin-text-field>
                <br><span>required</span>
            </div>
            <div class="form-item">
                <vaadin-text-field label="Age" pattern="\\d\\d\\d*" required="" value="35" name="age"></vaadin-text-field>
                <br><span>* 2 digits age</span>
            </div>
            <div class="form-item">
                <vaadin-text-field label="Password" required="" pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}" type="password" value="p@Ass123" name="password"></vaadin-text-field>
                <br><span>* 6 characters min including uppercase and number</span>
            </div>
        </form>
        <div style="text-align: center;">
            <paper-button raised="" class="indigo" id="btnSubmit">Register</paper-button>
            <paper-button>Back</paper-button>
        </div>
    </iron-form>
`;
  }

  static get properties() { return {
      visible: {
          type: Boolean,
          value: false
      }
  }}

  static get is() {
      return 'my-profile-register';   // must be same as dom-module id
  }

  static get observers() { return [
      '_showRegister(visible)'
  ]}

  ready() {
      super.ready();
      this.$.btnSubmit.addEventListener('click', e => {this._submit(e)});
      this.$.registerForm.addEventListener('iron-form-presubmit', e => {this._preProcessSubmit(e)});
      this.$.registerForm.addEventListener('iron-form-submit', e => {this._processSubmit(e)});
  }

  _submit(e) {
      if (!this.$.registerForm.validate()) {
          window.alert('Please fill all required fields with valid values');
      } else {
          this.$.registerForm.submit();
      }
  }
  _processSubmit(e) {
      this.$.myData.addUser(e.detail);
      this.dispatchEvent(new CustomEvent('show-toast', {
          bubbles: true, composed: true, detail: "Welcome to our website, " + event.detail.username + "!"}))
  }
  _preProcessSubmit(e) {
      //todo: check if user is existed.
  }

  _showRegister(visible) {
      if (!visible) {
          return;
      }
      let theTitle = "Register";
      this.loginUser = this.$.myData.getLoginUser();
      if (this.loginUser !== null) {
          theTitle = this.loginUser.username;
      }
      this.dispatchEvent(new CustomEvent('change-page', {
          bubbles: true, composed: true, detail: { title: theTitle }}));
  }
}

customElements.define(MyProfileRegister.is, MyProfileRegister);
