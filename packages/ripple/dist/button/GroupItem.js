"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function GroupItem(node) {
    node.classList.add('smui-button__group-item');
    return {
        destroy() {
            node.classList.remove('smui-button__group-item');
        }
    };
}
exports.default = GroupItem;
