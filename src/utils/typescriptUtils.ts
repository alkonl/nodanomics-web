export type Optionalize<T, K extends keyof T> = Partial<T> & Pick<T, K>;

// eslint-disable-next-line @typescript-eslint/ban-types
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
