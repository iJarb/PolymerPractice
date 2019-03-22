import { LitElement, html } from 'lit-element';

export default class BookmarkList extends LitElement {

  static get properties() {
    return {
      allContacts: { type: Array }
    }
  }

  constructor() {
    super();
    this.displayBookmarkContacts = this.displayBookmarkContacts.bind(this);
  }

  _editContact(e) {
    window.dispatchEvent(new CustomEvent('show-form', {
      detail: {
        mode: 'edit',
        id: e.currentTarget.id,
        data: this.allContacts[e.currentTarget.id]
      }
    }));
  }

  displayBookmarkContacts() {
    return this.allContacts.map((contact, index) => {
      if (contact.bookmark) {
        return html`
                <div class="card" .id="${index}" @click="${this._editContact}">
                  <div class="user-img"></div>
                  <div class="fullname">
                    <span class="text">${contact.first_name} ${contact.last_name}</span>
                    <span class="sub">Full name</span>
                  </div>
                  <div class="number">
                    <span class="text">${contact.phone_number}</span>
                    <span class="sub">Phone</span>
                  </div>
                  <div class="number">
                    <span class="text">${contact.email}</span>
                    <span class="sub">Email</span>
                  </div>
                </div>
                `;
      }
    });
  }

  render() {
    return html`
      <style>
        @import '/assets/css/global.css';
        :host {
          display: block;
        }
        h2 {
            color: #3e4162;
            font-weight: 300;
            grid-column: 1/4;
        }
        .bookmark {
            max-width: 800px;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 20px;
        }
        .card {
            width: 100%;
            display: grid;
            padding-top: 15px;
            grid-template-columns: 1fr 1fr;
            color: #3d4060;
            border-radius: 10px;
            transition: all .3s ease-in-out;
            cursor: pointer;
            -webkit-box-shadow: 0px 4px 77px -17px  rgba(0,0,0, 0.36);
            -moz-box-shadow: 0px 4px 77px -17px  rgba(0,0,0, 0.36);
            box-shadow: 0px 4px 77px -17px  rgba(0,0,0, 0.36);
        }
        .user-img {
            background-image: url("/assets/img/user-image.jpg");
            height: 80px;
            width: 80px;
            background-size: cover;
            background-position: center center;
            border-radius: 60px;
            grid-column: 1/3;
            align-self: center;
            justify-self: center;
        }
        .fullname {
            color: #3d4060;
            font-weight: 700;
            text-transform: capitalize;
            font-size: 1.3em;
            grid-column: 1/3;
            border-bottom: 1px solid rgba(0,0,0,.1);
        }
        .number {
            grid-column: 1/3;
            border-bottom: 1px solid rgba(0,0,0,.1);
        }
        .zipcode {
            border-left: 1px solid rgba(0,0,0,.1);
        }

        .text {
            display: block;
            text-align: center;
        }
        .sub {
            display: block;
            color: #b4b5c5;
            font-weight: 300;
            font-size: .8rem;
            text-align: center;
            margin: 5px 0;
        }
        .fullname, .user-img {
            font-size: 1.3em;
            font-weight: 400;
            padding: 15px;
        }

      </style>
        <section class="bookmark">
            <h2>Bookmark</h2>
            ${this.displayBookmarkContacts()}
        </section>
    `;
  }
}

window.customElements.define('bookmark-list', BookmarkList);
