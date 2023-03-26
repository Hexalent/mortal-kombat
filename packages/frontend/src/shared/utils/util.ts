type EventTargetType = Window | Document | HTMLElement | EventTarget
type EventListenerArgs<E extends Event = Event> = [string, ((event: E) => void) | null, ...any]

// Generic function to handle adding or removing event listeners based on the provided action
export function on<T extends EventTargetType, E extends Event = Event>(
  obj: T | null,
  ...args: Parameters<T['addEventListener']> | EventListenerArgs<E>
): void {
  if (obj && obj.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>))
  }
}

export function off<T extends EventTargetType, E extends Event = Event>(
  obj: T | null,
  ...args: Parameters<T['removeEventListener']> | EventListenerArgs<E>
): void {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>))
  }
}
