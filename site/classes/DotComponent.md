# DotComponent

This is the base component class to extend when creating a custom component. You don't need to instanciate
an object using this class. Create your own class extending this one.
<br><br>
The constructor takes no arguments, so you won't need to pass anything in the `super()` call.
<br><br>
Every component needs to declare at least a `$template` function and a static getter containing the tag to use in
the html. The template function is a factory function returning a tagged template string using the `html` tag (imported from lit-html).
Inside the string you can write your HTML thath will be converted to the actual DOM by the lit-html renderer.
<br>
The static getter should return a string with a valid custom component tag name (containing at least an hyphen) like
this `public static get tag() { return 'my-name' }`
<br><br>
__Before using the tag in your HTML templates and other places in your application you need to register the component
and let the `document` know about your element__ to do so you can use the `register(component : DotComponentContructor)`
helper.
<br><br>
For more information see the [Template Guide]().

### Example
```js
import { DotComponent, html, register } from 'dot';
// import { html } from 'lit-html'; // You can also import it from lit-html 

class CustomComponent extends DotCompnent {
  public static get tag() { return 'custom-component' }

  constructor() {
    super();

    this.$template = () => html`
      <!-- Some css why not... will be scoped to the component -->
      <style>
        h1 {
          color: red;
        }
      </style>
      <h1>Custom title here</h1>
      <!-- You can also import other custom components -->
      <another-custom-component></another-custom-component>
    `;

    // Insert your custom logic here
  }
}

// IMPORTANT register your component, this will use the class and the
// static declared tag getter to tell the document that your component
// exist and it is so called
register(CustomComponent);
```
Once you're done declaring and registering the component you can use it inside other components
templates litterals as you normally wold with the defined tag 
like so `<div><my-component attr="value"></my-component></div>` or mount it on another component or
the app continer with the `mount` (`app.mount(MyComponentInstance, null)`) method.

<!-- ## APIs

### $container
Type: `HTMLElement`
<br><br>
The DOM Node used as the app container

### $store
Type: `DotStore`
<br><br>
The current store for the app

### $router
Type: `DotRouter`
<br><br>
The current router for the app

---

### get $children
type: `readonly` `Array<DotComponent>`
<br><br>
An array of all the direct children mounted on the app `$container` DOM Node.

---

### create(container)
#### Arguments
`container : HTMLElement`
#### Description
Append the appplication on the container
#### Usage
```js
app.create(document.querySelector('#app'));
```

### mount(component, parent)
#### Arguments
`component : DotComponent`<br>
`parent : DotComponent | null`
#### Description
Programmatically mount the `component` on the `parent`. If parent is `null`, the component will
be mounted on the app instance instead.
#### Usage
```js
app.create(document.querySelector('#app'));
``` -->