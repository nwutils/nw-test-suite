# nw-api-sanity-check

This is a simple, manual testing suite, of the NW.js API.

It's more of a smoke test, not super thorough. Also I just started it and there is much room for improvement.


### Questions

* `nw.App.clearAppCache('');` - Don't know what to pass into this function. Docs just say "manifest_url"?
* `<iframe nwUserAgent="">` - Points to [Manifest docs](https://nwjs.readthedocs.io/en/latest/References/Manifest%20Format/#user-agent) for user agent, which has placeholders, but they don't work in this context. Should they? Is this a bug?
  * To test: `<iframe nwUserAgent="%name %ver %nwver %webkit_ver %chromium_ver %osinfo"></iframe>` should show real values, not just the placeholders.
* Should console logs from a Node context appear in the background page inspector or the window? Logically to me it should be the background page (which is how it works), but the docs aren't clear.
* `process.mainModule` is an object while [the docs](https://nwjs.readthedocs.io/en/latest/References/Changes%20to%20Node/#process) indicate it would be a string
