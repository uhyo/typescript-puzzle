import React from "react";

type State = {
  isError: boolean;
};

export class ErrorBoundary extends React.Component<{}, State> {
  static getDerivedStateFromError(): State {
    return {
      isError: true,
    };
  }

  state: State = {
    isError: false,
  };

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error(error, errorInfo);
  }

  render() {
    const {
      props: { children },
      state: { isError },
    } = this;

    if (isError) {
      return <p>Error :(</p>;
    } else {
      return children;
    }
  }
}
