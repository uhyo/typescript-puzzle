type State<T> =
  | {
      state: "pending";
      promise: Promise<T>;
    }
  | {
      state: "fulfilled";
      value: T;
    }
  | {
      state: "rejected";
      error: unknown;
    };
/**
 * Adapter for suspense
 */
export class Fetcher<T> {
  private state: State<T>;
  constructor(fetch: () => Promise<T>) {
    const promise = fetch().then(
      value => {
        this.state = {
          state: "fulfilled",
          value,
        };
        return value;
      },
      error => {
        this.state = {
          state: "rejected",
          error,
        };
        throw error;
      },
    );
    this.state = {
      state: "pending",
      promise,
    };
  }

  /**
   * Returns fetched data.
   * If data is not fetched yet, throw a promise.
   */
  public get(): T {
    if (this.state.state === "pending") {
      throw this.state.promise;
    } else if (this.state.state === "rejected") {
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
    if (this.state.state === "fulfilled") {
      return this.state.value;
    } else {
      return undefined;
    }
  }
}
