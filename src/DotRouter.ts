import DotApp from './DotApp';
import DotRoute from './DotRoute';
import DotRouterView from './DotRouterView';
import { register } from './utils';

class DotRouter {
  public $routes : Array<DotRoute>;
  public $route : DotRoute | undefined;
  public $view : DotRouterView;

  private app : DotApp;

  constructor(routes : Array<DotRoute>, app : DotApp) {
    this.$routes = routes;
    this.app = app;

    register(DotRouterView);
    this.$view = new DotRouterView();

    this.app.mount(this.$view, null);

    this.navigate(document.location.pathname);
  }

  navigate(path : string) {
    this.$route = this.current(path);
    if (typeof this.$route !== 'undefined') {
      //  Inject the current route in view and then render
      this.$view.render();
    }
  }

  current(path : string) : DotRoute | undefined {
    return this.$routes.find(route => route.path === path);
  }
}

export default DotRouter;
