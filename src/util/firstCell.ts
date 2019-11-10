/**
 * Class which holds the first given value.
 */
export class FirstCell<T> {
  private saved?: { value: T };

  public get(callback: () => T): T {
    if (this.saved) {
      return this.saved.value;
    }
    const value = callback();
    this.saved = { value };
    return value;
  }
}
