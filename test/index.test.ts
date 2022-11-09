import { pushUrl, onUrlChange, onUrlRequest } from "../src";

describe("pushUrl", () => {
  it("should push a URL", () => {
    pushUrl("/some/path");
  });
});

describe("onUrlChange", () => {
  it("should react to a URL being changed", () => {
    onUrlChange((state: object, url) => ({ ...state, url: url }));
  });
});

describe("onUrlRequest", () => {
  it("should react to a URL being requested", () => {
    onUrlRequest((state: object, location) => [
      state,
      pushUrl(location.pathname),
    ]);
  });
});
