import DotComponent from './DotComponent';

class DotRoute extends DotComponent {
  public $path : string | RegExp = '';
  public $matches : RegExpMatchArray | null = [];
  public $params : { [key: string]: string } | undefined = {};

  constructor() {
    super();
  }

  async enter() {}

  async leave() {}
}

export default DotRoute;
