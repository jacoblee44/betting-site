import { computed, type WritableComputedRef } from 'vue';

export function connectModelValue<T extends object, K extends keyof T>(
  props: T,
  emit: (emitKey: never, value: T[K]) => void,
  key: K,
): WritableComputedRef<T[K]> {
  return computed<T[K]>({
    get(): T[K] {
      return props[key];
    },
    set(val: T[K]) {
      emit(`update:${key as string}` as never, val);
    },
  });
}
