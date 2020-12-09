import DotComponent from "./DotComponent";

export interface DotComponentConstructor {
  new () : DotComponent;
  tag : string | null;
}