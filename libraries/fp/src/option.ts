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

export const map: <X, Y>(fn: (x: X) => Y) => (x: Option<X>) => Option<Y> = fn => x =>
  isNone(x) ? none : some(fn(x.value))

export const fromNullable = <A>(a: A | null): Option<NonNullable<A>> => (a === null ? none : some(a as NonNullable<A>))

export const toNullable: <A>(a: Option<A>) => A | null = a => (isSome(a) ? a.value : null)

export const toUndefined: <A>(a: Option<A>) => A | undefined = a => (isSome(a) ? a.value : undefined)

export const fromUndefined = <A>(a: A | undefined): Option<NonNullable<A>> =>
  a === undefined ? none : some(a as NonNullable<A>)
