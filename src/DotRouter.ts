import DotRoute from './DotRoute';

class DotRouter {
  public routes : Array<DotRoute>;

  constructor(routes? : Array<DotRoute>) {
    this.routes = routes || [];
  }

  get current() : DotRoute {
    return this.routes[0];
  }
}

export default DotRouter;
