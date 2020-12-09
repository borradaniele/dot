import { DotComponentConstructor } from "./declarations";

export const register = (descriptor : DotComponentConstructor) => {
  if (!descriptor.tag) {
    throw new Error('Component need to specify a valid tag property');
  }

  customElements.define(descriptor.tag, (descriptor as unknown as CustomElementConstructor));
}
