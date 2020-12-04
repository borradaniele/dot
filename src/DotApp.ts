import DotStore from "./DotStore";
import DotRouter from "./DotRouter";
import DotAppCustomElement from "./DotAppCustomElement";
import { html } from "lit-html";
import DotComponent from "./DotComponent";

class DotApp {
  public $container : HTMLElement | null = null;
  public $store : DotStore;
  public $router : DotRouter;
  public $el : DotAppCustomElement | null = null;
  public $template : Function;

  private tree : Array<DotComponent> = [];

  constructor(store : DotStore, router : DotRouter) {
    this.$store = !store ? new DotStore() : store;
    this.$router = !router ? new DotRouter() : router;

    this.$template = (contenxt : any) => html`<!-- Empty app -->`;

    // Register the custom element used for $el inside components
    customElements.define('dot-app', DotAppCustomElement);
  }

  mount(container : HTMLElement) {
    this.$container = container;
    this.$el = new DotAppCustomElement(this.$template, this);
    this.$container.appendChild(this.$el);
  }
}

export default DotApp;
