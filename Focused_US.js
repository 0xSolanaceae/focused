// ==UserScript==
// @name          Focused
// @namespace     https://solanaceae.xyz/
// @icon          https://icons.iconarchive.com/icons/graphicloads/medical-health/256/eye-icon.png
// @description   Prevent websites from knowing that you switched tabs
// @author        Solanaceae
// @version       1.0
// @match         *://*/*
// @run-at        document-start
// ==/UserScript==

unsafeWindow.onblur = null;
unsafeWindow.blurred = false;

unsafeWindow.document.hasFocus = function () {return true;};
unsafeWindow.window.onFocus = function () {return true;};

Object.defineProperty(document, "hidden", { value : false});
Object.defineProperty(document, "mozHidden", { value : false});
Object.defineProperty(document, "msHidden", { value : false});
Object.defineProperty(document, "webkitHidden", { value : false});
Object.defineProperty(document, 'visibilityState', { get: function () { return "visible"; } });

unsafeWindow.document.onvisibilitychange = undefined;

for (event_name of ["visibilitychange",
                    "webkitvisibilitychange",
                    "blur", // may cause issues on some websites
                    "mozvisibilitychange",
                    "msvisibilitychange"]) {
  window.addEventListener(event_name, function(event) {
        event.stopImmediatePropagation();
    }, true);
}
