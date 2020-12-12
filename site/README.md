# Welcome to Dot

Dot is a framewrok born to mitigate the gap between complex or semi-complex modern js frameworks and the native web apis. **Starting up as a personal experiment the framework is not in even in an alpha state right now, so please use it just for testing and helping with the development**.

## APIs
Dot is basically a collection of classes written by design to emulate some common modern frameworks APIs but using underneth the modern Custom Elements (aka Web Components) API to implement these functionalities, and where not possibile it tries to stay native as much as possible (for example with `Proxy` for reactivity). The template engine is [lit-html](https://lit-html.polymer-project.org/) a wonderfull and blazing fast HTML rendering engine by the [Polymer](https://www.polymer-project.org/) team witch gos very well with web componets structure.

The framewrok mainly exposes a DotApp class witch is the entry point of the application, and then the DotComponent class that you need to extend for each component. Once the component is registered and mounted using the `app.mount(component : DotComponent, parent : DotComponent | null)` method and the app is created with `app.create(container : Node)` the basic game is done and you will see your component mounted as a Custom Element on the app container node with some useful reactive props and APIs.

## Classes
Below there is a list of all the exposed classes and their main functionality, for in-depth APIs documentation refer to the class page.
|Class Name|Usage and Content|
|----------|-----------------|
|[`DotApp`](/dot/classes/DotApp)|This is the main class that describes and contains all the core functionality of your app. It is meant to be instanciated, not extended like the `DotComponent` class, and the using the method `create()` appended to a pre-created DOM Node|
|[`DotComponent`](/dot/classes/DotComponent)|This is the basic component class, all of your components will need to extend this class. This parent class provides all the reactive logic implemented into properties and all the necessary method to make the transition to native more friendly|