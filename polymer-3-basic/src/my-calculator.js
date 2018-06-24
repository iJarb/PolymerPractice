import { LitElement, html } from '@polymer/lit-element';

class MyCalculator extends LitElement {

    constructor() {
        super();
        this.total = 0;
    }

    static get properties() { 
        return { 
            total: Number
        } 
    }

    _render({ mood }) {
        return html`
            <style>
            .button {
                color: white;
                padding: 15px 25px;
                display: inline-block;
                border-radius: 10px;
                cursor: pointer;
            }

            .add-button { background-color: #00aaff; }

            .sub-button { background-color: #ffaa00; }
            </style>

            <div id="total" class="total">${this.total}</div>
            <div id="addBtn" class="button add-button">+</div>
            <div id="subBtn" class="button sub-button">-</div>
        `;
    }

    _firstRendered() {
        this._root.getElementById("addBtn").addEventListener("click", e => this.total++);
        this._root.getElementById("subBtn").addEventListener("click", e => this.total--);
    }
}

customElements.define('my-calculator', MyCalculator);
