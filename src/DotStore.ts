import DotApp from "./DotApp";

class DotStore {
  public state : object;

  private _state : object;
  private app : DotApp | null = null;

  constructor(initial : object) {
    this._state = initial;
    this.state = new Proxy(this._state, this.handler);
  }

  init(app : DotApp) {
    this.app = app;
  }

  private get handler () {
    const context = this;
    return {
      get (target : object, key : string, receiver : any) {
        return Reflect.get(target, key, receiver);
      },
      set (target : object, key : string, value : any, receiver : any) {
        const r = Reflect.set(target, key, value, receiver);
        // context.app.renderTree(); TODO: Render linked components
        return r;
      }
    }
  }
}

export default DotStore;
