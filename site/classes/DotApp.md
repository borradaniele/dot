# DotApp

This is the main class to create your app mand mange all your components.

```javascript
constructor (store : DotStore | undefined, router : DotRouter | undefined) : DotApp
```
The constructor reiceve 2 optionals parameters. One is the store (an instance of the `DotStore`) class witch is a utility class created to handle your application global state, you can also create your own state system. The other is a router (an instance of the `DotRouter`) used to manage your applications first level components (also called from now on routes or views) these are simply `DotComponent` instaces but with some additional class apis and properties. If no store is provided an empty one will be created for you and will be accessible from the `app.$store` property, if no router is provided one will be created for you and inside the router a basic empty *index* view will be initiated and the router will be accessible within the `app.$router` property.
### Example
```javascript
const router = new DotRouter();
const app = new DotApp(undefined, router);

app.$router; // This will be the same reference as your router from the first line
app.$store; // This will be an empty store
```

## APIs

### DOTApp.create(container)
#### Arguments
container : HTMLElement
#### Description
Append the appplication on the container
#### Usage
```javascript
app.create(document.querySelector('#app'));
```