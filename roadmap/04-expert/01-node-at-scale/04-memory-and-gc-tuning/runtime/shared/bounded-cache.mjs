export class BoundedCache {
  #store = new Map();

  constructor(maxEntries) {
    this.maxEntries = maxEntries;
  }

  set(key, value) {
    if (this.#store.has(key)) {
      this.#store.delete(key);
    }

    this.#store.set(key, value);

    if (this.#store.size > this.maxEntries) {
      const oldestKey = this.#store.keys().next().value;
      this.#store.delete(oldestKey);
    }
  }

  size() {
    return this.#store.size;
  }
}
