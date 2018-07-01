import {LitElement, html} from '@polymer/lit-element';

export default class FormPopup extends LitElement {
    _render({}) {
        return html`
      <style>
        @import '/assets/css/global.css';
        :host {
          display: block;
        }
        .form-popup {
            background: #2b304c;
            height: 100vh;
            width:100vw;
            position: fixed;
            top: 0;
            left:0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .form-group {
        }
        form {
            background: white;
            padding: 20px;
            border-radius: 10px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            width: 400px;
            grid-gap: 20px;
        }
        h2 {
            font-size: 1.4rem;
            font-weight: 500;
            grid-column: 1/5;
        }
        label{
            background: white;
            font-size: .8rem;
            position: relative;
            top: 10px;
            display: inline-block;
        }
        input[type="text"] {
            padding: 10px;
            display: block;
            width: 100%;
        }
        .first-name {
            grid-column: 1/3;
        }
        .last-name {
            grid-column: 3/5;
        }
        .address-1 {
            grid-column: 1/5;
        }
        .address-2 {
            grid-column: 1/5;
        }
        .city {
            grid-column: 1/3;
        }
        .button {
            justify-self: end;
            grid-column: 4/5
        }
        .button button {
            cursor: pointer;
            padding: 10px 25px;
            border: 1px solid rgba(0,0,0,.2);
            color: white;
            border-radius: 5px;
            text-shadow: 0px 10px 2px rgba(150, 150, 150, 0.1);
            background: #1e5799; /* Old browsers */
            background: -moz-linear-gradient(top, #1e5799 0%, #207cca 31%, #207cca 31%, #2989d8 50%, #7db9e8 100%); /* FF3.6-15 */
            background: -webkit-linear-gradient(top, #1e5799 0%,#207cca 31%,#207cca 31%,#2989d8 50%,#7db9e8 100%); /* Chrome10-25,Safari5.1-6 */
            background: linear-gradient(to bottom, #1e5799 0%,#207cca 31%,#207cca 31%,#2989d8 50%,#7db9e8 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#1e5799', endColorstr='#7db9e8',GradientType=0 ); /* IE6-9 */
        }
      </style>
    <section class="form-popup">
        <form>
            <h2>Add a new contact</h2>
            <div class="form-group first-name">
                <label for="first_name">First Name</label>
                <input type="text" name="first_name">
            </div>
            <div class="form-group last-name">
                <label for="last_name">Last Name</label>
                <input type="text" name="last_name">
            </div>
            <div class="form-group address-1">
                <label for="address_1">Address #1</label>
                <input type="text" name="address_1">
            </div>
            <div class="form-group address-2">
                <label for="address_2">Address #2</label>
                <input type="text" name="address_2">
            </div>
            <div class="form-group city">
                <label for="city">City</label>
                <input type="text" name="city">
            </div>
            <div class="form-group state">
                <label for="state">State</label>
                <input type="text" name="state">
            </div>
            <div class="form-group zipcode">
                <label for="zipcode">Zipcode</label>
                <input type="text" name="zipcode">
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