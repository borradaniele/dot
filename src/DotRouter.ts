import DotApp from './DotApp';
import DotRoute from './DotRoute';
import DotRouterLink from './DotRouterLink';
import DotRouterView from './DotRouterView';
import { register } from './utils';

class DotRouter {
  public $routes : Array<DotRoute>;
  public $route : DotRoute | undefined;
  public $view : DotRouterView;

  private app : DotApp | null = null;

  constructor(routes : Array<DotRoute>) {
    this.$routes = routes;

    register(DotRouterView);
    register(DotRouterLink);
    this.$view = new DotRouterView();
  }

  init(app : DotApp) {
    this.app = app;
    this.app.mount(this.$view, null);

    window.addEventListener('popstate', (event : PopStateEvent) => this.handlePopstate(event));
    window.addEventListener('dot-router-navigate', (event : any) => this.linkNavigate(event));

    this.navigate(this.location);
  }

  navigate(path : string, foreward = true) {
    this.$route?.remove();
    if (foreward) window.history.pushState({}, '', path);

    this.$route = this.$routes.find((route) => {
      return route.path instanceof RegExp ? route.path.test(path) : route.path === path;
    });

    if (this.$route) this.$view.shadowRoot?.appendChild(this.$route);
    this.$view.render();
  }

  handlePopstate(event : PopStateEvent) {
    this.navigate(this.location, false);
  }

  linkNavigate(event : CustomEvent) {
    this.navigate(event.detail.path);
  }

  public get location() : string {
    return document.location.href.replace(document.location.origin, '');
  }
}

export default DotRouter;
