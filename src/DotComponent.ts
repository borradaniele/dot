import { html, render } from "lit-html";

class DotComponent extends HTMLElement {
  public $attributes : any;
  public $data : object;
  public $watchers : Map<string, Function>;
  public $template : Function;
  public $parent : DotComponent | null = null;
  public $el : ShadowRoot | null;
  public $refs : object;

  public mounted : Function = () => {};
  public destroyed : Function = () => {};
  public adopted : Function = () => {};
  
  private _data : object;

  public static get tag () : string | null { return null; }

  constructor() {
    super();

    this._data = {};
    this.$data = new Proxy(this._data, this.handler);

    this.$attributes = {};

    this.$watchers = new Map();

    this.$template = (context : any) => html`<!-- Empty component -->`;
    this.attachShadow({ mode: 'open' });

    this.$refs = new Proxy({}, this.refs);

    this.setAttribute('dot', '');

    this.$el = this.shadowRoot;
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
    }
    return this.mounted();
  }

  disconnectedCallback() {
    return this.destroyed();
  }

  adoptedCallback() {
    return this.adopted();
  }

  render() {
    if (!this.shadowRoot) throw Error('Before render, shadowroot must be mounted');
    render(this.$template(), this.shadowRoot, { eventContext: this });
  }

  attributeChangedCallback(attributeName : string, oldValue : any, newValue : any) {
    this.$attributes[attributeName] = newValue;
    this.render();
  }

  select(selector : string) : NodeList {
    return this.querySelectorAll(selector);
  }

  private get handler () {
    const context = this;
    return {
      get (target : object, key : string, receiver : any) {
        return Reflect.get(target, key, receiver);
      },
      set (target : object, key : string, value : any, receiver : any) {
        const old = (context._data as any)[key];
        const r = Reflect.set(target, key, value, receiver);
        if (context.$watchers.get(key)) {
          (context.$watchers.get(key) as Function).call(context, (context._data as any)[key], old);
        }
        context.render();
        return r;
      }
    }
  }

  private get refs () {
    const context = this;
    return {
      get (target : object, key : string, receiver : any) {
        return context.shadowRoot?.querySelector(`[ref="${key}"]`);
      },
      set () {
        throw new Error('Cannot set a ref pragmatically. Use the attribute instead');
      }
    } 
  }

  public get $children () {
    return new Array(this.shadowRoot?.querySelectorAll('[dot]'));
  }
}

export default DotComponent;
