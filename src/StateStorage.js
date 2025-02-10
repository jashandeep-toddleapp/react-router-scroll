import { readState, saveState } from "history/lib/DOMStateStorage";

const STATE_KEY_PREFIX = "@@scroll|";

export default class StateStorage {
  constructor(router) {
    this.getFallbackLocationKey = router.createPath;
  }

  read(location, key) {
    try {
      return readState(this.getStateKey(location, key));
    } catch (e) {
      return [0, 0];
    }
  }

  save(location, key, value) {
    try {
      saveState(this.getStateKey(location, key), value);
    } catch (e) {
      // sessionStorage is not avaliable
    }
  }

  getStateKey(location, key) {
    const locationKey =
      location.pathname || this.getFallbackLocationKey(location);
    const stateKeyBase = `${STATE_KEY_PREFIX}${locationKey}`;
    return key == null ? stateKeyBase : `${stateKeyBase}|${key}`;
  }
}
