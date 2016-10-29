# FF-SVG-path-pushState-workaround

Brutal workaround for [FF issue #652991](https://bugzilla.mozilla.org/show_bug.cgi?id=652991)

May be useful for SPA who rely on SVG patterns `url(#...)` and `history.pushState`.
Having this stack you may noticed FF adds ` none;` to the end of `fill/stroke` paths after changing route, causing SVG paths to break.

This workaround should refresh pattern paths on route change, whereby SVG won't break.

It **does not** observe `window.onpopstate` event so you have to call it manually once route changes.

[Demo without fix](http://jsfiddle.net/GfVKN/) Take a look at Firefox

[Demo with fix](http://jsfiddle.net/GfVKN/3)

Usage

```
import fixSVGPathsFF from 'ff-svg-path-pushstate-workaround'

or 

var fixSVGPathsFF = require('ff-svg-path-pushstate-workaround')

or

var fixSVGPathsFF = window.ffSvgPathPushstateWorkaround

// at some point when route changes
fixSVGPathsFF()
```

By default it will lookup for all tags containing pattern in stroke or fill attributes.
`document.querySelectorAll([fill^="url(#"], [stroke^="url(#"])`

You may change it to fit your needs by passing custom selector as optional argument
`fixSVGPathsFF('path') // will affect all path tags`

P.s. Please note that default selector would search only fill/stroke specified *by attributes*. It won't find its parameters specified by styles, so you have to specify selector that will suit your needs, as mentioned above. (For example 'path' worked for me because on my project only path tags were used and all stroke/path parameters were specified by styles)

As example of usage with `react-router`

```
// yes, this should be called on every route change
const fixSVGPatternPathsInFF = () => {
    fixSVGPathsFF('path')
}

<Route path='/' component={App}>
    <Route path='profile' component={Profile} onEnter={fixSVGPatternPathsInFF} />
    ...
</Route>
```

MIT
