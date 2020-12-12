# DotApp

This is the main class to create your app mand mange all your components.

```js
constructor (store : DotStore | undefined, router : DotRouter | undefined) : DotApp
```
The constructor reiceve 2 optionals parameters. One is the store (an instance of the `DotStore`) class witch is a utility class created to handle your application global state, you can also create your own state system. The other is a router (an instance of the `DotRouter`) used to manage your applications first level components (also called from now on routes or views) these are simply `DotComponent` instaces but with some additional class apis and properties. If no store is provided an empty one will be created for you and will be accessible from the `app.$store` property, if no router is provided one will be created for you and inside the router a basic empty *index* view will be initiated and the router will be accessible within the `app.$router` property.
### Example
```js
const router = new DotRouter();
const app = new DotApp(undefined, router);

app.$router; // This will be the same reference as your router from the first line
app.$store; // This will be an empty store
```

## APIs

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
```