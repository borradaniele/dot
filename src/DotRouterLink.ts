import { html } from "lit-html";
import DotComponent from "./DotComponent";

class DotRouterLink extends DotComponent {
  public static get tag() { return 'router-link' }

  constructor() {
    super();

    this.$template = () => html`
      <a part="a" href="${this.getAttribute('to')}" @click="${this.handleClick}">
        <slot></slot>
      </a>
    `;
  }

  handleClick(event : MouseEvent) {
    event.preventDefault();
    const navigateEvent = new CustomEvent('dot-router-navigate', {
      detail: {
        path: this.getAttribute('to'),
      }
    });
    window.dispatchEvent(navigateEvent);
  }
}

export default DotRouterLink;
