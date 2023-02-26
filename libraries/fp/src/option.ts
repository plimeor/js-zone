/* @internal */
enum OptionTag {
  Some = '_some',
  None = '_none'
}

export interface Some<T> {
  /* @internal */
  _tag: OptionTag.Some
  value: T
}

export interface None {
  /* @internal */
  _tag: OptionTag.None
}

export type Option<T> = Some<T> | None

export const some: <T>(value: T) => Some<T> = value => ({
  _tag: OptionTag.Some,
  value
})

export const none: None = { _tag: OptionTag.None }

export const isSome = <T>(value: Option<T>): value is Some<T> => value._tag === OptionTag.Some

export const isNone = <T>(value: Option<T>): value is None => value._tag === OptionTag.None

export const map: <X, Y>(transformer: (x: X) => Y) => (x: Option<X>) => Option<Y> = transformer => x =>
  isNone(x) ? none : some(transformer(x.value))

export const fromNullable = <T>(value: T | null): Option<NonNullable<T>> =>
  value === null ? none : some(value as NonNullable<T>)

// eslint-disable-next-line unicorn/no-null
export const toNullable = <T>(value: Option<T>): T | null => (isSome(value) ? value.value : null)

export const toUndefined = <T>(value: Option<T>): T | undefined => (isSome(value) ? value.value : undefined)

export const fromUndefined = <T>(value: T | undefined): Option<NonNullable<T>> =>
  value === undefined ? none : some(value as NonNullable<T>)
