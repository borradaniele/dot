import { html } from "lit-html";
import { DotComponentOptions } from "./declations";
import DotCustomElement from "./DotCustomElement";

class DotComponent {
  public name : string;
  public tag : string;
  public template : Function;

  private $props : object;
  public props : object;
  private $data : object;
  public data : object;
  public $el : DotCustomElement;

  constructor(options : DotComponentOptions) {
    if (!options.name) throw new Error('Invalid component name');
    if (!options.tag || options.tag.includes('-')) throw new Error('Invalid tag name');

    this.name = options.name;
    this.tag = options.tag;

    this.$props = {};
    this.props = new Proxy(this.$props, this.$handler);

    this.$data = {};
    this.data = new Proxy(this.$data, this.$handler);

    // Create a Web Component (aka Custome Element) associated with
    // the current component instance and store it in the $el
    // the component by itself must overwrite this template
    // otherwise you will see this span.
    this.template = (context : any) => html`<span>Empty Component: {context.name}</span>`;
    this.$el = new DotCustomElement(this.template, this);
  }

  get $handler () {
    const render = this.$el.render;

    return {
      get (target : object, key : string, receiver : any) {
        return Reflect.get(target, key, receiver);
      },
      set (target : object, key : string, value : any, receiver : any) {
        const r = Reflect.set(target, key, value, receiver);
        render();
        return r;
      }
    }
  }
}

export default DotComponent;
