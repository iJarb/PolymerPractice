import { PolymerElement } from '../../../@polymer/polymer/polymer-element.js';
import '../../../@polymer/app-layout/app-header/app-header.js';
import '../../../@polymer/app-layout/app-toolbar/app-toolbar.js';
import '../../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../../@polymer/paper-button/paper-button.js';
import '../../../@polymer/iron-icons/iron-icons.js';
import '../../../@polymer/iron-media-query/iron-media-query.js';
import '../../../@polymer/iron-pages/iron-pages.js';
import '../../../@polymer/paper-toast/paper-toast.js';
import '../../../@polymer/app-route/app-location.js';
import '../../../@polymer/app-route/app-route.js';
import '../../../@polymer/app-layout/app-drawer/app-drawer.js';
import './my-profile-navigator.js';
import './my-profile-data.js';
import './my-profile-404.js';
import './my-profile-login.js';
import './my-profile-register.js';
import './my-profile-home.js';
import { html } from '../../../@polymer/polymer/lib/utils/html-tag.js';
import { importHref } from '../../../@polymer/polymer/lib/utils/import-href.js';
/**
 * @customElement
 * @polymer
 */
class MyProfileApp extends PolymerElement {
  static get template() {
    return html`
    <style>
      :host {
        display: block;
        --app-primary-color: #202020;
        --app-secondary-color: #757575;
        --app-accent-color: #172C50;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      }
      app-header {
        background-color: #00897B;
        color: #fff;
      }

      .menu-btn {
        display: none;
      }

      .yellow-button {
        text-transform: none;
        color: #eeff41;
      }

      /* small screen */
      @media (max-width: 767px) {
        .menu-btn {
          display: block;
        }
      }
    </style>
    <app-location route="{{route}}"></app-location>
    <app-route route="{{route}}" pattern="[[rootPattern]]:page" data="{{routeData}}" tail="{{subroute}}">
    </app-route>

    <iron-media-query query="max-width: 767px" query-matches="{{smallScreen}}"></iron-media-query>

    <app-header slot="header" reveals="">
      <app-toolbar>
        <paper-icon-button class="menu-btn" icon="menu" on-click="_toggleDrawer"></paper-icon-button>
        <div main-title="">[[title]]</div>
        <my-profile-navigator should-render="[[!_shouldRenderDrawer]]"></my-profile-navigator>
        <paper-icon-button icon="search"></paper-icon-button>
      </app-toolbar>
    </app-header>

    <app-drawer opened="{{drawerOpened}}" swipe-open="" tabindex="0" style="z-index: 100 !important;">
      <my-profile-navigator class="list" should-render="[[_shouldRenderDrawer]]"></my-profile-navigator>
    </app-drawer>

    <iron-pages selected="[[page]]" selected-attribute="visible" attr-for-selected="name" fallback-selection="404" role="main">

      <my-profile-home name="home"></my-profile-home>
      <my-profile-login name="login"></my-profile-login>
      <my-profile-register name="register"></my-profile-register>
      <my-profile-404 name="404"></my-profile-404>
    </iron-pages>

    <paper-toast id="appLeftBottomToast" text="You have a new message."></paper-toast>
`;
  }

  static get is() { return 'my-profile-app'; }

  static get properties() {
      return {
          page: {
              type: String,
              reflectToAttribute: true,
              observer: '_pageChanged'
          },
          rootPattern: String,
          routeData: Object,
          subroute: String,
          title: {
              type: String,
              value: "My Profile"
          },
          _shouldRenderDrawer: {
              computed: '_computeShouldRenderDrawer(smallScreen)'
          }
      };
  }

  static get observers() {
      return [
          '_routePageChanged(routeData.page)',
      ];
  }

  constructor() {
      super();

      // Get root pattern for app-route, for more info about `rootPath` see:
      // https://www.polymer-project.org/2.0/docs/upgrade#urls-in-templates
      this.rootPattern = (new URL(this.rootPath)).pathname;
  }

  ready() {
      super.ready();
      this.addEventListener('change-page', (e)=>this._onChangePage(e));
      this.addEventListener('show-toast', (e)=>this._onShowToast(e));
  }

  _onChangePage(event) {
      let detail = event.detail;
      if (detail.title) {
          document.title = detail.title + ' | My Profile';
          this.title = document.title;
      }
  }
  _onShowToast(event) {
      this.$.appLeftBottomToast.text = event.detail;
      this.$.appLeftBottomToast.open();
  }
  //      attributeChangedCallback() {
  //          super.attributeChangedCallback();
  //      }

  _routePageChanged(page) {
      if (page === undefined) {
          return;
      }
      this.page = page || 'home';
      this._toggleDrawer();
  }

  _toggleDrawer() {
      if (this._shouldRenderDrawer) {
          this.drawerOpened = !this.drawerOpened;
      }
  }

  _computeShouldRenderDrawer(smallScreen) {
      return smallScreen;
  }

  _pageChanged(page) {
      // Load page import on demand. Show 404 page if fails
      // Register service worker if supported.
      if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('service-worker.js', {scope: '/'});
      }
      var resolvedPageUrl = this.resolveUrl('my-profile-' + page + '.html');
      importHref(
          resolvedPageUrl,
          null,
          this._showPage404.bind(this),
          true);
  }

  _showPage404() {
      this.page = '404';
  }
}

window.customElements.define(MyProfileApp.is, MyProfileApp);
