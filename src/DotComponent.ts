import { DotComponentOptions } from "./declations";

class DotComponent {
  public name : string;
  public tag : string;

  private $props : object;
  public props : object;
  private $data : object;
  public data : object;

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
