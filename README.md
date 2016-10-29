# FF-SVG-path-pushState-workaround

Brutal workaround for [FF issue #652991](https://bugzilla.mozilla.org/show_bug.cgi?id=652991)

May be useful for SPA who rely on SVG patterns `url(#...)` and history.pushState.
Having this stack you may noticed FF adds ` none;` to the end of `fill/stroke` paths after changing route, causing SVG paths to break.