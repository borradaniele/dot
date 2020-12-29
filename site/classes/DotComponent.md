# DotComponent

This is the base component class to extend when creating a custom component. You don't need to instanciate an object using this class. Create your own class extending this one.
<br><br>
The constructor takes no arguments, so you won't need to pass anything in the `super()` call.
<br><br>
Every component needs to declare at least a `$template` function and a static getter containing the tag to use in
the html. The template function is a factory function returning a tagged template string using the `html` tag (imported from lit-html). Inside the string you can write your HTML thath will be converted to the actual DOM by the lit-html renderer.
<br>
The static getter should return a string with a valid custom component tag name (containing at least an hyphen) like
this `public static get tag() { return 'my-name' }`
<br><br>
__Before using the tag in your HTML templates and other places in your application you need to register the component and let the `document` know about your element__ to do so you can use the `register(component : DotComponentContructor)`
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
Once you're done declaring and registering the component you can use it inside other components templates litterals as you normally wold with the defined tag like so `<div><my-component attr="value"></my-component></div>` or mount it on another component or the app continer with the `mount` (`app.mount(MyComponentInstance, null)`) method.

## APIs

### $attributes
Type: `any`
<br><br>
This is a particular propery, it is basically an object where each key is an attribute watched by the web component (so previously defined in the static getter `static get observedAttributes()` as value inside the return array) and each value is the value of the attribute, so a `string` (as specs HTML attributes only allowed type is string).

#### Usage
```js
// For example on a component declared like this
class CustomComponent extends DotComponent {
  public get observedAttributes() { return ['name'] }

  constructor() {
    super();

    // The template will render with the name attribute value and re-render
    // automatically on each change
    this.$template = html`<div>${this.getAttribute('name')}</div>`;
  }
}

const customComponent = new CustomComponent();
// The 'name' attribute value will be reflected in the $attributes.name
console.log(this.$attributes.name);
```


### $data
Type: `object`
<br><br>
This is the main store for the component reactive datas, every property inside this object when changed, and when needed, will trigger an update of the current component template. You can also watch changes with the `$watchers` 

### $watchers
Type: `Map<string, Function>`
<br><br>
This is a `Map`, containing for each key that maps to a `$data` property a function that will be triggered when the associated `$data` property changes. The `newValue` and the `oldValue` are respectively passed as arguments to the callback function.

#### Usage
```js
component.$data.name = 'foo';
component$watchers.set('foo', (newValue, oldValue) => {
  console.log(newValue); // Will log 'bar'
  console.log(oldValye); // Will log 'foo'
});
component.$data.name = 'bar';
```
### $parent
Type: `DotComponent`
<br><br>
The current component parent. This is the `DotComponent` passed as parent when calling `app.mount()` for your current componet

### $el
Type: `ShadowRoot`
<br><br>
The current custom element shadowroot, equalt to `this.shadowRoot` where `this` is a custom element instance.

### $refs
Type: `any`
<br><br>
A collection of all the children with a specified `ref` attribute. Every property in this object corresponds to the actual `DotComponent` instantiated with the `ref` attribute value as the property key. For example writing `<custom-element ref="customElement"></custom-element>` will make the `CustmoElement` componet instance available in
`this.$refs.customElement`.

#### Usage
```js
console.log(this.$refs.customElement.$data.name); // Will log the value of the name property in the $data of the CustomElement instance
```

---

### get $children
type: `readonly` `Array<DotComponent>`
<br><br>
An array of all the direct children mounted on the app `$container` DOM Node.

---

### mounted()
#### Arguments
`no args`
#### Description
The callback to call when the component is mounted on DOM Node.
#### Usage
```js
this.mounted = () => { console.log('mounted!', this) }; // Will log when the component is moutned on the DOM Node
```

### destroyed()
#### Arguments
`no args`
#### Description
The callback to call when the component is removed from the DOM Node. Useful for making cleanup works.
#### Usage
```js
this.destroyed = () => {
  delete this.someInstance;
  removeTimeoud(id);
  // And other cleanups
};
```

### adopted()
#### Arguments
`no args`
#### Description
The callback to call when the component is moved from the current DOM Node to another DOM Node. Useful for clearing and re-instancing props dependant from the parent node.
#### Usage
```js
this.adopted = () => {
  delete this.someInstance;
  this.someInstance = new Instance();
};
```
