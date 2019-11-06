type State<T> =
  | {
      state: "none";
    }
  | {
      state: "fetching";
      promise: Promise<T>;
    }
  | {
      state: "fetched";
      value: T;
    };
/**
 * Adapter for suspense
 */
export class Fetcher<T> {
  private state: State<T> = { state: "none" };
  constructor(private fetch: () => Promise<T>) {}

  /**
   * Get the value.
   * If it is not fetched yet, throw a promise.
   */
  public get(): T {
    console.log(this.state.state);
    if (this.state.state === "none") {
      const promise = this.fetch().then(value => {
        this.state = {
          state: "fetched",
          value,
        };
        return value;
      });
      this.state = {
        state: "fetching",
        promise,
      };
      throw promise;
    } else if (this.state.state === "fetching") {
      throw this.state.promise;
    } else {
      return this.state.value;
    }
  }
}
