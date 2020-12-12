# DotComponent

This is the base component class to extend when creating a custom component. You don't need to instanciate
an object using this class. Create your own class extending this one.
<br><br>
The constructor takes no arguments, so you won't need to pass anything in the `super()` call.
<br><br>
Every component needs to declare at least a `$template` function, witch is a factory function returning
a tagged template string using the `html` tag (imported from lit-html). Inside the string you can write your HTML thath 
will be converted to the actual DOM by the lit-html renderer.
<br><br>
For more information see the [Template Guide]().

### Example
```js
import { DotComponent, html } from 'dot';
// import { html } from 'lit-html'; // You can also import it from lit-html 

class CustomComponent extends DotCompnent {
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
```

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