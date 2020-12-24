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

    this.navigate(document.location.pathname);
  }

  navigate(path : string, foreward = true) {
    console.log('Navigating', document.location.pathname);
    this.$route?.remove();
    if (foreward) window.history.pushState({}, '', path);

    this.$route = this.$routes.find(route => route.path === path);
    if (typeof this.$route !== 'undefined') {
      this.$view.shadowRoot?.appendChild(this.$route);
      this.$view.render();
    }
  }

  handlePopstate(event : PopStateEvent) {
    this.navigate(document.location.pathname, false);
  }

  linkNavigate(event : CustomEvent) {
    this.navigate(event.detail.path);
  }
}

export default DotRouter;
