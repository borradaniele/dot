## Example of basic usage

To test this file use a bundler and include the result in an html file

```javascript
import { DotApp, DotComponent, html, register } from 'dot';

const app = new DotApp();

class AppTitle extends DotComponent {
  // Declare observed attributes thath will trigger renders on change
  static get observedAttributes() { return ['title']; }

  constructor() {
    super({ name: 'AppTitle', tag: 'app-title' });

    this.$data.something = null;

    // Watch this data and log it's value on change
    this.$watchers.set('something', () => {
      console.log(this.$data.something);
    });

    this.$template = () => html`
      <style>
        h1 { color: darkgray; }
      </style>
      <h1>${this.getAttribute('title')}</h1>
    `;
  }
}

class TextBlock extends DotComponent {
  constructor() {
    super({ name: 'TextBlock', tag: 'text-block' });

    this.$template = () => html`
      <div class="text-block">
        <!-- Mount a child compinent using the template -->
        <app-title title="Hello world!"></app-title>
      </div>
    `;

    requestAnimationFrame(() => {
      // Wait next tick and render its child
      this.shadowRoot.querySelector('app-title').render();
    });

    setTimeout(() => {
      // Update the title attribute, and trigger the update
      this.shadowRoot.querySelector('app-title').setAttribute('title', '...Hooray!');
      // Also trigger a watcher by changing a watched data
      this.shadowRoot.querySelector('app-title').$data.something = 'hello!';
    }, 2000);
  }
}

// Create the app mounting it on a DOM node
app.create(document.querySelector('#app'));

// Register both the components
register('app-title', AppTitle);
register('text-block', TextBlock);

// Pragmatically create a TextBlock component
const tb = new TextBlock();
// Mount the text block on the app node by not settina a parent
app.mount(tb);
// Render the whole registered tree on the app
// components included in the templates will not be rendered
app.renderTree();
```