import EventManger from '../lib/EventManager';

export const toastEventManager = new EventManger();

export default function toast({ type, text, duration }) {
  toastEventManager.emit('addtoast', { type, text, duration });
}
