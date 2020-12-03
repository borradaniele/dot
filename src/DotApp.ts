import DotStore from "./DotStore";
import DotRouter from "./DotRouter";

class DotApp {
  public container : HTMLElement;
  public store : DotStore;
  public router : DotRouter;

  constructor(container : HTMLElement, store : DotStore, router : DotRouter) {
    this.container = container;
    this.container.setAttribute('data-dot-container', '');

    this.store = !store ? new DotStore() : store;
    this.router = !router ? new DotRouter() : router;
  }
}

export default DotApp;
