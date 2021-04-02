import { pushUrl, onUrlChange, onUrlRequest } from "../src";

describe("pushUrl", () => {
  it("should push a URL", () => {
    pushUrl();
  });
});

describe("onUrlChange", () => {
  it("should react to a URL being changed", () => {
    onUrlChange();
  });
});

describe("onUrlRequest", () => {
  it("should react to a URL being requested", () => {
    onUrlRequest();
  });
});
