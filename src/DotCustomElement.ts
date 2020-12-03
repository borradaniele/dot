// This class will contain a custom element
// uesd to describe all the DotComponet $el prop

import { render } from "lit-html";
import DotComponent from "./DotComponent";

class DotCustomElement extends HTMLElement {
  public template : Function;
  public context : DotComponent;

  constructor(template : Function, context : DotComponent) {
    super();

    this.template = template;
    this.context = context;
    
    this.attachShadow({ mode: 'open' });
  }

  render() {
    if (!this.shadowRoot) throw new Error('Shadow Root has not been yet attached');

    render(this.template(this.context), this.shadowRoot, { eventContext: this });
  }
}

export default DotCustomElement;
