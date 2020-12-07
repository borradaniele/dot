import { html } from "lit-html";
import { DotComponentOptions } from "./declations";
import DotComponentCustomElement from './DotComponentCustomElement';

class DotComponent {
  public name : string;
  public tag : string;

  private $props : object;
  public props : object;
  private $data : object;
  public data : object;
  public $template : Function;
  public $el : DotComponentCustomElement | null = null;

  private tree : Array<DotComponent> = [];

  constructor(options : DotComponentOptions) {
    if (!options.name) throw new Error('Invalid component name');
    if (!options.tag || options.tag.includes('-')) throw new Error('Invalid tag name');

    this.name = options.name;
    this.tag = options.tag;

    this.$props = {};
    this.props = new Proxy(this.$props, this.$handler);

    this.$data = {};
    this.data = new Proxy(this.$data, this.$handler);

    this.$template = (contenxt : any) => html`<!-- Empty component -->`;
  }

  mount(parent : DotComponent) {
    this.$el = new DotComponentCustomElement(this.$template, this);
    parent.$template = () => html`${parent.$template(parent)}${this.$el}`;
  }

  get $handler () {
    return {
      get (target : object, key : string, receiver : any) {
        return Reflect.get(target, key, receiver);
      },
      set (target : object, key : string, value : any, receiver : any) {
        const r = Reflect.set(target, key, value, receiver);
        return r;
      }
    }
  }
}

export default DotComponent;
