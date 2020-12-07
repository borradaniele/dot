export const register = (tag : string, descriptor : CustomElementConstructor) => {
  customElements.define(tag, descriptor);
}
