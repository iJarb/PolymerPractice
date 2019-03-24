import { LitElement, html, css, unsafeCSS } from 'lit-element';
import { SharedStyles, XSmallScreen } from '../shared-styles';
import '@polymer/paper-dialog';
import '@vaadin/vaadin-button';

export default class FormPopup extends LitElement {

  static get properties() {
    return {
      formData: { type: Object },
      mode: { type: String }
    }
  }

  constructor() {
    super();
    this.formData = {};
    this.mode = 'add';
    this.change = this._change.bind(this);
    window.addEventListener('show-form', (e) => this._showForm(e));
  }

  _submitForm() {
    if (this.mode == 'edit') {
      window.dispatchEvent(new CustomEvent('save-contact', { detail: { id: this._editingId, data: this.formData } }));
    } else {
      window.dispatchEvent(new CustomEvent('save-contact', { detail: this.formData }));
    }
    this._cancelForm();
  }

  _showForm(e) {
    this.shadowRoot.querySelector('#form-dialog').open();
    this.mode = e.detail.mode;

    if (this.mode == 'edit') {
      this._editingId = e.detail.id;

      Object.keys(e.detail.data).forEach((k) => {
        this._assignValueToInput(k, e.detail.data[k]);
      });
    }
  }

  _cancelForm() {
    this.formData = {};

    // clear form data
    const inputs = this.shadowRoot.querySelectorAll('input');
    inputs.forEach(i => {
      if (i.type == 'text') {
        i.value = '';
      } else if (i.type == 'checkbox') {
        i.checked = false;
      }
    });
    this.shadowRoot.querySelector('#form-dialog').close();
  }

  _change(event) {
    let formData = {};
    let name = event.target.name;
    let value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

    formData[name] = value;
    this.formData = Object.assign(this.formData, formData);
  }

  _assignValueToInput(inputName, value) {
    const input = this.shadowRoot.querySelector('input[name=\'' + inputName + '\']');
    if (input && input.type == 'text') {
      input.value = value;
    } else if (input && input.type == 'checkbox') {
      input.checked = value;
    }
  }

  render() {
    return html`
      <paper-dialog id="form-dialog" modal>
        <h2>${this.mode == 'add' ? 'Add contact' : 'Update contact'}</h2>
        <form @submit="${this.submitForm}" autocomplete="off">
          <div class="first-name">
            <label for="first_name">First Name</label>
            <input type="text" name="first_name" id="first_name" @keyup="${this._change}">
          </div>
          <div class="last-name">
            <label for="last_name">Last Name</label>
            <input type="text" name="last_name" id="last_name" @keyup="${this._change}">
          </div>
          <div class="phone_number">
            <label for="phone_number">Phone number</label>
            <input type="text" name="phone_number" id="phone_number" @keyup="${this._change}">
          </div>
          <div class="email">
            <label for="email">Email</label>
            <input type="text" name="email" id="email" @keyup="${this._change}">
          </div>
          <div class="address">
            <label for="address_2">Address</label>
            <input type="text" name="address" id="address" @keyup="${this._change}">
          </div>
          <div class="city">
            <label for="city">City</label>
            <input type="text" name="city" id="city" @keyup="${this._change}">
          </div>
          <div class="state">
            <label for="state">State</label>
            <input type="text" name="state" id="state" @keyup="${this._change}">
          </div>
          <div class="zipcode">
            <label for="zipcode">Zipcode</label>
            <input type="text" name="zipcode" id="zipcode" @keyup="${this._change}">
          </div>
          <div class="bookmark">
            <input type="checkbox" id="is-bookmark" name="bookmark" @change="${this._change}">
            <label for="is-bookmark" style="top: 0">Add to bookmark</label>
          </div>
          <vaadin-button @click="${this._submitForm}" theme="primary">${this.mode == 'add' ? html`Add` : 'Update'}</vaadin-button>
          <vaadin-button @click="${this._cancelForm}" theme="tertiary">Cancel</vaadin-button>
        </form>
      </paper-dialog>
    `;
  }

  static get styles() {
    return [
      SharedStyles,
      css`
        form {
          background: white;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          width: 40rem;
          grid-gap: 2rem;
        }
        h2 {
          font-size: 2.2rem;
          font-weight: 500;
          grid-column: 1/5;
        }
        label {
          background: white;
          font-size: 1.2rem;
          position: relative;
          top: 1rem;
          display: inline-block;
        }
        input[type="text"] {
          padding: .8rem .6rem;
          display: block;
          width: 100%;
          font-size: 1.2rem;
        }
        .first-name {
          grid-column: 1/3; /*from col 1 to col 3*/
        }
        .last-name {
          grid-column: 3/5; /*from col 3 to col 5*/
        }
        .phone_number {
          grid-column: 1/3;
        }
        .email {
          grid-column: 3/5;
        }
        .address {
          grid-column: 1/5;
        }
        .city {
          grid-column: 1/3;
        }
        .bookmark {
          justify-self: start;
          grid-column: 1/3;
        }
      `,
      unsafeCSS(XSmallScreen(`
        form {
          padding: 0 1rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: 100%;
          grid-gap: .5rem;
        }
        .first-name, .last-name, .phone_number, .email, .address, .city {
          grid-column: 1/3;
        }
        .state {
          grid-column: 1/2;
        }
        .zipcode {
          grid-column: 2/2;
        }
        .bookmark {
          grid-column: 1/3;
        }
      `))
    ];
  }
}

window.customElements.define('form-popup', FormPopup);
