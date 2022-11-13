type Callable = (...args: any) => any

type FunctionParams<T extends object, K extends keyof T = keyof T> = K extends string ? T[K] extends (...args: any) => any ? K : never : never

// @ts-expect-error
export const call = <T extends object, K extends FunctionParams<T>>(k: K, ...params: Parameters<T[K] extends Callable ? T[K] : never>) => (obj: T): ReturnType<T[K] extends Callable ? T[K] : never> => (obj[k as any])(...params as any)