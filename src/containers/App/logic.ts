export type AppState = {
  page: AppPage;
};

export type AppPage = {
  type: "stage";
  /**
   * ID of stage.
   */
  id: string;
};

export type AppAction = {};

export const reducer = (state: AppState, action: AppAction): AppState => {
  return state;
};

export const getInitialState = (options: {}): AppState => ({
  page: {
    type: "stage",
    id: "v1.l1.s1",
  },
});
