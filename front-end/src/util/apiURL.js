export const apiURL = () => {
    return window.location.hostname === "localhost"
      ? "http://localhost:3333"
      : "https://event-ful.adaptable.app";
  };
  