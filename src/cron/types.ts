export type Uuid = string;
export type ActivationRule<T extends any[]> = {
  func: (...args: T) => boolean;
  args: T;
};
