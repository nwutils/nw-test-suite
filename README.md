# nw-api-sanity-check

_WIP_ - NW.js cross platform test suite using prebuilt binary to quickly test its API.

## Running Locally

1. fork/clone/download
1. `npm install`
1. `npm start` to run automated tests
1. `npm manual` to run manual tests in the window (instructions provided)

### Known Issues

- **API:** `nw.Window.*`
  - **Platform:** N/A
  - **Issue:** Not an issue but potential improvement.
  - **Todo:** Test each `nw.Window.*` component separately.
- **API:** `nw.Window.height`
  - **Platform:** MacOS
  - **Issue:** Actual height is 28px more than user input height.
  - **Todo:** Fix this behavior in upstream
- **API:** `nw.Window.on` `devtools-closed`
  - **Platform:** All
  - **Issue:** This event is currently not supported.
  - **Todo:** Use `nw-build-tools` to run debug build and test if it works.
- **API:** `Chromedriver`
  - **Platform:** Windows
  - **Issue:** Fails for Windows. Need to investigate.
  - **Todo:** Maybe find Chromedriver path via `nw` Node module's `findpath` function?

### Questions

- `nw.App.clearAppCache('');` - Don't know what to pass into this function. Docs just say "manifest_url"?
- `<iframe nwUserAgent="">` - Points to [Manifest docs](https://nwjs.readthedocs.io/en/latest/References/Manifest%20Format/#user-agent) for user agent, which has placeholders, but they don't work in this context. Should they? Is this a bug?
  - To test: `<iframe nwUserAgent="%name %ver %nwver %webkit_ver %chromium_ver %osinfo"></iframe>` should show real values, not just the placeholders.
- Should console logs from a Node context appear in the background page inspector or the window? Logically to me it should be the background page (which is how it works), but the docs aren't clear.
- `process.mainModule` is an object while [the docs](https://nwjs.readthedocs.io/en/latest/References/Changes%20to%20Node/#process) indicate it would be a string
