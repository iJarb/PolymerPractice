import { LitElement, html } from 'lit-element';

export default class FormPopup extends LitElement {

  static get properties() {
    return {
      popupOpen: { type: Boolean },
      formData: { type: Object },
      mode: { type: String }
    }
  }

  constructor() {
    super();
    this.formData = {};
    this.mode = 'add';
    this.change = this._change.bind(this);
    this.submitForm = this.submitForm.bind(this);
    window.addEventListener('show-form', (e) => this._showForm(e));
  }

  submitForm(event) {
    event.preventDefault();
    if (this.mode == 'edit') {
      window.dispatchEvent(new CustomEvent('save-contact', { detail: { id: this._editingId, data: this.formData } }));
    } else {
      window.dispatchEvent(new CustomEvent('save-contact', { detail: this.formData }));
    }
    this._closeForm();
  }

  _showForm(e) {
    this.popupOpen = true;
    this.mode = e.detail.mode;

    if (this.mode == 'edit') {
      this._editingId = e.detail.id;

      Object.keys(e.detail.data).forEach((k) => {
        this._assignValueToInput(k, e.detail.data[k]);
      });
    }
  }

  _closeForm() {
    this.popupOpen = false;
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
    if (input.type == 'text') {
      input.value = value;
    } else if (input.type == 'checkbox') {
      input.checked = value;
    }
  }

  render() {
    return html`
      <style>
        @import '/assets/css/global.css';
        @import '/assets/css/FormPopup.css';
      </style>
    <section class="form-popup ${this.popupOpen ? 'active' : ''}">
        <form @submit="${this.submitForm}" autocomplete="off">
            <div class="closing-btn" @click="${this._closeForm}">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
            </div>
            <h2>${this.mode == 'add' ? 'Add contact' : 'Update contact'}</h2>
            <div class="form-group first-name">
                <label for="first_name">First Name</label>
                <input type="text" name="first_name" id="first_name" @keyup="${this._change}">
            </div>
            <div class="form-group last-name">
                <label for="last_name">Last Name</label>
                <input type="text" name="last_name" id="last_name" @keyup="${this._change}">
            </div>
            <div class="form-group phone_number">
                <label for="phone_number">Phone number</label>
                <input type="text" name="phone_number" id="phone_number" @keyup="${this._change}">
            </div>
            <div class="form-group email">
                <label for="email">Email</label>
                <input type="text" name="email" id="email" @keyup="${this._change}">
            </div>
            <div class="form-group address">
                <label for="address_2">Address</label>
                <input type="text" name="address" id="address" @keyup="${this._change}">
            </div>
            <div class="form-group city">
                <label for="city">City</label>
                <input type="text" name="city" id="city" @keyup="${this._change}">
            </div>
            <div class="form-group state">
                <label for="state">State</label>
                <input type="text" name="state" id="state" @keyup="${this._change}">
            </div>
            <div class="form-group zipcode">
                <label for="zipcode">Zipcode</label>
                <input type="text" name="zipcode" id="zipcode" @keyup="${this._change}">
            </div>
            <div class="form-group question">
                <input type="checkbox" id="is-bookmark" name="bookmark" @change="${this._change}">
                <label for="is-bookmark" style="top: 0">Add to bookmark</label>
            </div>
            <div class="form-group button">
                <button type="submit">${this.mode == 'add' ? html`Add` : 'Update'}</button>
            </div>

        </form>
    </section>
    `;
  }

}

window.customElements.define('form-popup', FormPopup);
