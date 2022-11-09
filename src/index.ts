import { Dispatch, Dispatchable, Subscription, Unsubscribe } from "hyperapp";

export function pushUrl(url: string) {
  history.pushState({}, "", url);
  dispatchEvent(new CustomEvent("hyperapp-pushstate"));
}

function _onUrlChange<S>(
  dispatch: Dispatch<S>,
  action: Dispatchable<S>
): Unsubscribe {
  const popstate = (_) => dispatch(action, location);

  addEventListener("popstate", popstate);
  addEventListener("hyperapp-pushstate", popstate);

  return () =>
    ["popstate", "hyperapp-pushstate"].map((e) =>
      removeEventListener(e, popstate)
    );
}
export function onUrlChange<S>(action: Dispatchable<S>): Subscription<S> {
  return [_onUrlChange, action];
}

function _onUrlRequest<S>(
  dispatch: Dispatch<S>,
  action: Dispatchable<S>
): Unsubscribe {
  const clicks = (event) => {
    let target = event.target;
    while (target && !target.matches("a")) target = target.parentElement;
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && target) {
      const href = target.getAttribute("href");
      const dest = new URL(href, location.href);
      if (
        dest.protocol == location.protocol &&
        dest.hostname == location.hostname
      ) {
        event.preventDefault();
        dispatch(action, { pathname: href });
      }
    }
  };
  addEventListener("click", clicks);
  return () => removeEventListener("click", clicks);
}
export function onUrlRequest<S>(action: Dispatchable<S>): Subscription<S> {
  return [_onUrlRequest, action];
}
