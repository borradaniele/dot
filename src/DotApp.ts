import DotStore from "./DotStore";
import DotRouter from "./DotRouter";
import DotComponent from "./DotComponent";

class DotApp {
  public $container : HTMLElement | null = null;
  public $store : DotStore | null = null;
  public $router : DotRouter | null = null;

  constructor() { }
  
  use(store : DotStore, router : DotRouter) {
    this.$store = !store ? new DotStore({}) : store;
    this.$router = !router ? new DotRouter([]) : router;
    this.$store.init(this);
    this.$router.init(this);
  }

  create(container : HTMLElement) {
    this.$container = container;
  }
  
  mount(component : DotComponent, parent : DotComponent | null) {
    component.$parent = parent;
    
    // Append the component to the correct parent
    if (!component.$parent && this.$container) {
      this.$container.appendChild(component);
    } else if (component.$parent?.shadowRoot && this.$container) {
      component.$parent.shadowRoot.append(component);
    } else {
      throw Error('Trying to append a component without parent but app it has not being mounted yet.');
    }
  }

  public get $children () {
    return new Array(this.$container?.querySelectorAll('[dot]'));
  }
}

export default DotApp;
