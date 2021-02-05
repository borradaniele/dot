import DotApp from './DotApp';
import DotRoute from './DotRoute';
import DotRouterLink from './DotRouterLink';
import DotRouterView from './DotRouterView';
import { register } from './utils';

class DotRouter {
  public $routes : Array<DotRoute>;
  public $route : DotRoute | undefined;
  public $view : DotRouterView;
  public $mode : 'in-out' | 'out-in' = 'out-in';

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

  async navigate(path : string, foreward = true) {
    if (this.$mode === 'out-in') {
      // Animate the current route out
      await this.$route?.leave();
      // Remove the current route
      this.$route?.remove();
      // Push the state if needed
      if (foreward) window.history.pushState({}, '', path);
      // Find the new route
      this.matchRoute(path);
      // Append the new route if needed
      if (this.$route) this.$view.shadowRoot?.appendChild(this.$route);
      this.$view.render();
      // Animate the new route in next frame
      requestAnimationFrame(() => this.$route?.enter());
    } else if (this.$mode === 'in-out') {
      // Store the current route
      const current = this.$route;
      // Push the state if needed
      if (foreward) window.history.pushState({}, '', path);
      // Find the new route
      this.matchRoute(path);
      // Append the new route if needed
      if (this.$route) this.$view.shadowRoot?.appendChild(this.$route);
      this.$view.render();
      // Animate the new route in
      await this.$route?.enter();
      // Animate the old route out
      await current?.leave();
      // Remove the old route
      current?.remove();
    } else {
      throw new Error('Invalid mode type on router view');
    }
  }

  matchRoute(path : string) {
    this.$route = this.$routes.find((route) => {
      return route.$path instanceof RegExp ? route.$path.test(path) : route.$path === path;
    });
    if (this.$route?.$path instanceof RegExp) {
      this.$route.$matches = path.match(this.$route.$path);
      this.$route.$params = this.$route.$matches?.groups;
    }
  }

  handlePopstate(event : PopStateEvent) {
    this.navigate(this.location, false);
  }

  linkNavigate(event : CustomEvent) {
    this.navigate(event.detail.$path);
  }

  public get location() : string {
    return document.location.href.replace(document.location.origin, '');
  }
}

export default DotRouter;
