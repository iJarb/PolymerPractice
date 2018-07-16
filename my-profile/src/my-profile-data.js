import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/app-storage/app-localstorage/app-localstorage-document.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
/**
 * @customElement
 * @polymer
 */
class MyProfileData extends PolymerElement {
  static get template() {
    return html`
    <app-localstorage-document key="my-profile-data" data="{{users}}"></app-localstorage-document>
    <app-localstorage-document id="loginUserStorage" session-only="true" key="login-data" data="{{loginUser}}"></app-localstorage-document>
`;
  }

  static get is() { return 'my-profile-data'; }
  static get properties() {
    return {
        users: {
            type: Array,
            value: () => [],
            notify: true
        },
        loginUser: {
            type: Object,
            value: () => {},
            notify: true,
            reflectToAttribute: true
        }
    };
  }

  ready() {
      super.ready();
      // The data from storages will be load to users or loginUser when something calls those variables
      this.loginUser = this.$.loginUserStorage.__parseValueFromStorage();
      if (this.users.length === 0) {
          this.addUser({
              "username":"admin",
              "email":"trungtanbui@gmail.com",
              "age":20,
              "password":"myP@ss123"
          })
      }
  }

  // could have some validation or conversion here
  addUser(object) {
      this.push('users', object);
  }

  logIn(username, password) {
      let user = this.users.find(x => x.username === username && x.password === password);
      if (user) {
          //delete user.password;   //cannot login again if delete this password
          this.loginUser = user;
          return user;
      }
      return false;
  }
  getLoginUser() {
      return this.$.loginUserStorage.__parseValueFromStorage();
  }

  logOut() {
      this.loginUser = null;
      this.$.loginUserStorage.saveValue();
  }
}

window.customElements.define(MyProfileData.is, MyProfileData);
