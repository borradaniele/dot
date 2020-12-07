import { html, render } from "lit-html";
import { DotComponentOptions } from "./declations";

class DotComponent extends HTMLElement {
  public name : string;
  public tag : string;

  public $props : object;
  public $data : object;
  public $template : Function;
  public $parent : DotComponent | null = null;
  
  private _props : object;
  private _data : object;

  constructor(options : DotComponentOptions) {
    super();

    if (!options.name) throw new Error('Invalid component name');
    if (!options.tag || options.tag.includes('-')) throw new Error('Invalid tag name');

    this.name = options.name;
    this.tag = options.tag;

    this.$props = {};
    this._props = new Proxy(this.$props, this.$handler);

    this.$data = {};
    this._data = new Proxy(this.$data, this.$handler);

    this.$template = (contenxt : any) => html`<!-- Empty component -->`;
    this.attachShadow({ mode: 'open' });
  }
  
  register(descriptor : CustomElementConstructor) {
    customElements.define(this.tag, descriptor);
  }

  render() {
    if (!this.shadowRoot) throw Error('Before render, shadowroot must be mounted');
    render(this.$template(this), this.shadowRoot, { eventContext: this });
  }

  get $handler () {
    const render = () => this.render();
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
