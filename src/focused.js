// ==UserScript==
// @name          Focused
// @namespace     https://solanaceae.xyz/
// @icon          https://raw.githubusercontent.com/0xSolanaceae/focused/refs/heads/main/assets/eye-icon.png
// @description   Prevent websites from knowing that you switched tabs
// @author        Solanaceae
// @version       1.0
// @match         *://*/*
// @run-at        document-start
// ==/UserScript==

"use strict";

(function() {
    const preventTabSwitchDetection = () => {
        unsafeWindow.onblur = null;
        unsafeWindow.blurred = false;

        unsafeWindow.document.hasFocus = () => true;
        unsafeWindow.window.onFocus = () => true;

        Object.defineProperty(document, "hidden", { value: false });
        Object.defineProperty(document, "mozHidden", { value: false });
        Object.defineProperty(document, "msHidden", { value: false });
        Object.defineProperty(document, "webkitHidden", { value: false });
        Object.defineProperty(document, 'visibilityState', { get: () => "visible" });

        unsafeWindow.document.onvisibilitychange = undefined;

        const events = [
            "visibilitychange",
            "webkitvisibilitychange",
            "blur", // may cause issues on some websites
            "mozvisibilitychange",
            "msvisibilitychange"
        ];

        events.forEach(event_name => {
            window.addEventListener(event_name, event => {
                event.stopImmediatePropagation();
            }, true);
        });
    };

    try {
        preventTabSwitchDetection();
    } catch (error) {
        console.error("Failed to initialize Focused script:", error);
    }
})();