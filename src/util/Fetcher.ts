type State<T> =
  | {
      state: "fetching";
      promise: Promise<T>;
    }
  | {
      state: "fetched";
      value: T;
    }
  | {
      state: "error";
      error: unknown;
    };
/**
 * Adapter for suspense
 */
export class Fetcher<T> {
  private state: State<T>;
  constructor(fetch: () => Promise<T>) {
    const promise = fetch()
      .then(value => {
        this.state = {
          state: "fetched",
          value,
        };
        return value;
      })
      .catch(error => {
        this.state = {
          state: "error",
          error,
        };
        throw error;
      });
    this.state = {
      state: "fetching",
      promise,
    };
  }

  /**
   * Returns fetched data.
   * If data is not fetched yet, throw a promise.
   */
  public get(): T {
    if (this.state.state === "fetching") {
      throw this.state.promise;
    } else if (this.state.state === "error") {
      throw this.state.error;
    } else {
      return this.state.value;
    }
  }

  /**
   * Returns fetched data.
   * Returns undefined if not fetched yet.
   */
  public getOrUndefined(): T | undefined {
    if (this.state.state === "fetched") {
      return this.state.value;
    } else {
      return undefined;
    }
  }
}
