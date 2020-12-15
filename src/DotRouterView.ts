import { html } from "lit-html";
import DotComponent from "./DotComponent";

class DotRouterView extends DotComponent {
  public static get tag() { return 'router-view' }

  constructor() {
    super();

    this.$template = () => html`<slot name="view"></slot>`;
  }
}

export default DotRouterView;
