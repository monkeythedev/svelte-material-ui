"use strict";
exports.__esModule = true;
exports.initialFocus = void 0;
function initialFocus(node, props) {
    var target = props.target || node;
    target.setAttribute("data-mdc-dialog-initial-focus", "");
    return {
        destroy: function () {
            target.removeAttribute("data-mdc-dialog-initial-focus");
        }
    };
}
exports.initialFocus = initialFocus;
