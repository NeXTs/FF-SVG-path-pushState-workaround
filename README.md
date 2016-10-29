# FF-SVG-path-pushState-workaround

Brutal workaround for [FF issue #652991](https://bugzilla.mozilla.org/show_bug.cgi?id=652991)

May be useful for SPA who rely on SVG patterns `url(#...)` and history.pushState.
Having this stack you may noticed FF adds ` none;` to the end of `fill/stroke` paths after changing route, causing SVG paths to break.

This workaround should refresh pattern paths on route change, whereby SVG won't break.

It **don't** observe `window.onpopstate` event so you should call it manually after route changes.

Usage

```
import fixSVGPathsFF from 'ff-svg-path-pushstate-workaround'

or 

var fixSVGPathsFF = require('ff-svg-path-pushstate-workaround')

or

var fixSVGPathsFF = window.ffSvgPathPushstateWorkaround

// at some point route changes
fixSVGPathsFF()
```

By default it will lookup for all tags containing pattern in stroke or fill attributes.
`[fill^="url(#"], [stroke^="url(#"]`

You may change fit it to your needs by passing custom selector as optional argument
`fixSVGPathsFF('path') // will affect all path tags`

P.s. Please note that default selector would search only fill/stroke specified by attributes. It won't find its parameters specified by styles, so you have to specify selector that will suit your needs, as mentioned above. (For example 'path' worked for me because on my project only path tags were used and all stroke/path parameters were specified by styles)

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