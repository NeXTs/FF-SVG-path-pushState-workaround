/*! FF-SVG-path-pushState-workaround - v1.0.1 - 2016-10-29
* http://NeXTs.github.com/ff-svg-path-pushstate-workaround/
* Copyright (c) 2016 Denis Lukov; Licensed MIT */

/**
 * FF SVG patterns path issue workaround
 * https://bugzilla.mozilla.org/show_bug.cgi?id=652991
 *
 * May be deleted once FF releases v51
 */

;(function(name, definition) {
    if (typeof module != 'undefined') module.exports = definition()
    else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
    else this[name] = definition()
}('ffSvgPathPushstateWorkaround', function() {

    var isFirefox = /firefox/i.test(navigator.userAgent), ffVersion
    if(isFirefox) ffVersion = parseInt(navigator.userAgent.split('/').pop())
    
    return function() {
        if( ! isFirefox || ffVersion >= 51) return

        var patterns = document.querySelectorAll('[fill^="url(#"], [stroke^="url(#"]')
        for(var i = 0, ii = patterns.length, pattern; i < ii; i++) {
            pattern = patterns[i]
            pattern.style.fill = pattern.style.fill
            pattern.style.stroke = pattern.style.stroke
        }
    }
}));