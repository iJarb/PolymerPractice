import {LitElement, html} from '@polymer/lit-element';

export default class ContactsList extends LitElement {
    _render({}) {
        return html`
      <style>
        @import '/assets/css/global.css';
        :host {
          display: block;
        }
        h2 {
            color: #3e4162;
            font-weight: 300;
        }
        .contacts {
            max-width: 800px;
        }
        .contact {
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 2fr 3fr 1fr 1fr;
            color: #3d4060;
            padding: 20px;
            border-radius: 10px;
            transition: all .3s ease-in-out;
            cursor: pointer;
        }
        .contact:hover {
            -webkit-box-shadow: 0px 4px 77px -17px  rgba(0,0,0, 0.36);
            -moz-box-shadow: 0px 4px 77px -17px  rgba(0,0,0, 0.36);
            box-shadow: 0px 4px 77px -17px  rgba(0,0,0, 0.36);
        }
        .contact .user-img {
            background-image: url("https://s3.amazonaws.com/uifaces/faces/twitter/idiot/128.jpg");
            height: 40px;
            width: 40px;
            background-size: cover;
            background-position: center center;
            border-radius: 10px;
        }
        .contact .fullname {
            color: #3d4060;
            font-weight: 700;
            text-transform: capitalize;
            font-size: 1.3em;
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
        .fullname, .user-img, .category, .state, .number {
            font-size: 1.3em;
            font-weight: 400;
        }
        
      </style>
        <section class="contacts">
            <h2>Contacts</h2>
            <div class="contact">
                <div class="user-img"></div>
                <div class="fullname">
                    <span class="text">Tan Bui</span>
                    <span class="sub">Full name</span>
                </div>
                <div class="number">
                    <span class="text">123 - 456 - 789</span>
                    <span class="sub">Phone</span>    
                </div>
                <div class="state">
                    <span class="text">TUR</span>
                    <span class="sub">State</span>    
                </div>
                <div class="category">
                    <span class="text">Work</span>
                    <span class="sub">Category</span>    
                </div>
            </div> 
            
            <div class="contact">
                <div class="user-img"></div>
                <div class="fullname">
                    <span class="text">Tan Bui</span>
                    <span class="sub">Full name</span>
                </div>
                <div class="number">
                    <span class="text">123 - 456 - 789</span>
                    <span class="sub">Phone</span>    
                </div>
                <div class="state">
                    <span class="text">TUR</span>
                    <span class="sub">State</span>    
                </div>
                <div class="category">
                    <span class="text">Work</span>
                    <span class="sub">Category</span>    
                </div>
            </div> 
        </section>
    `;
    }
}

window.customElements.define('contacts-list', ContactsList);
