![DOT Logo](logo.png)

## DOCS
Full documentation is available here https://borradaniele.github.com/dot

## Example of basic usage

To test this file use a bundler and include the result in an html file

```javascript
import { DotApp, DotComponent, register, html } from 'dot';

const app = new DotApp();

class AppTitle extends DotComponent {
  // Declare observed attributes thath will trigger renders on change
  static get observedAttributes() { return ['title']; }
  static get tag() { return 'app-title' }

  constructor() {
    super();

    this.$data.something = null;

    // Watch this data and log it's value on change
    this.$watchers.set('something', (newValue, oldValue) => {
      console.log('Old: ', oldValue);
      console.log('New: ', newValue);
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
  static get tag() { return 'text-block' }

  constructor() {
    super();

    this.$template = () => html`
      <!-- Mount a child compinent using the template -->
      <app-title title="Hello world!" ref="title"></app-title>
    `;

    requestAnimationFrame(() => {
      // Wait next tick and render its child
      this.$refs.title.render();
    });

    setTimeout(() => {
      // Update the title attribute, and trigger the update
      this.$refs.title.setAttribute('title', '...Hooray!');
      // Also trigger a watcher by changing a watched data
      this.$refs.title.$data.something = 'hello!';
    }, 2000);
  }
}

// Create the app mounting it on a DOM node
app.create(document.querySelector('#app'));

// Register both the components
register(AppTitle);
register(TextBlock);

// Pragmatically create a TextBlock component
const tb = new TextBlock();
// Mount the text block on the app node by not settina a parent
app.mount(tb);

console.log(app.$children);
```