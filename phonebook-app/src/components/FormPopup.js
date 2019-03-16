import { LitElement, html } from 'lit-element';

export default class FormPopup extends LitElement {

  static get properties() {
    return {
      popupOpen: { type: Boolean },
      formData: { type: Object }
    }
  }

  constructor() {
    super();
    this.formData = {};
    this.change = this.change.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(event) {
    event.preventDefault();
    window.dispatchEvent(new CustomEvent('save-contact', { detail: this.formData }));
    this.formData = {};
    this._clearForm();
  }

  _clearForm() {
    var inputs = this.querySelectorAll('input');
    inputs.forEach(i => {
      if (i.type == 'text') {
        i.value = '';
      } else if (i.type == 'checkbox') {
        i.checked = false;
      }
    });
  }

  change(event) {
    let formData = {};
    let name = event.target.name;
    let value = (event.target.type === 'checkbox') ? event.target.checked : event.target.value;

    formData[name] = value;
    this.formData = Object.assign(this.formData, formData);
  }

  _toogleAddForm() {
    window.dispatchEvent(new CustomEvent('toggle-add-form'));
  }

  render() {
    return html`
      <style>
        @import '/assets/css/global.css';
        @import '/assets/css/FormPopup.css';
      </style>
    <section class="form-popup ${this.popupOpen ? 'active' : ''}">
        <form @submit="${this.submitForm}" autocomplete="off">
            <div class="closing-btn" @click="${this._toogleAddForm}">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-prefix="fas" data-icon="times" class="svg-inline--fa fa-times fa-w-11" role="img" viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
            </div>
            <h2>Add a new contact</h2>
            <div class="form-group first-name">
                <label for="first_name">First Name</label>
                <input type="text" name="first_name" @keyup="${this.change}">
            </div>
            <div class="form-group last-name">
                <label for="last_name">Last Name</label>
                <input type="text" name="last_name" @keyup="${this.change}">
            </div>
            <div class="form-group address-1">
                <label for="address_1">Address #1</label>
                <input type="text" name="address_1" @keyup="${this.change}">
            </div>
            <div class="form-group address-2">
                <label for="address_2">Address #2</label>
                <input type="text" name="address_2" @keyup="${this.change}">
            </div>
            <div class="form-group city">
                <label for="city">City</label>
                <input type="text" name="city" @keyup="${this.change}">
            </div>
            <div class="form-group state">
                <label for="state">State</label>
                <input type="text" name="state" @keyup="${this.change}">
            </div>
            <div class="form-group zipcode">
                <label for="zipcode">Zipcode</label>
                <input type="text" name="zipcode" @keyup="${this.change}">
            </div>
            <div class="form-group question">
                <input type="checkbox" id="is-favorite" name="favorite" @change="${this.change}">
                <label for="is-favorite" style="top: 0">Is Favorite?</label>
            </div>
            <div class="form-group button">
                <button type="submit">Add</button>
            </div>

        </form>
    </section>
    `;
  }

}

window.customElements.define('form-popup', FormPopup);
