"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reviveFactory = function (container) {
    var elements = container.querySelectorAll('[data-react-text]');
    var pool = {};
    for (var i = 0; i < elements.length; i++) {
        pool[elements.item(i).getAttribute('data-react-text')] = elements.item(i).innerHTML;
    }
    return function (key, value) {
        if (!!value && !!value.$innerHTML) {
            var el = pool[value.$innerHTML];
            if (!el) {
                throw new Error("cannot find text with id " + value);
            }
            return el;
        }
        return value;
    };
};
exports.reviveFactory = reviveFactory;
var replaceFactory = function (textPool) { return function (key, value) {
    if (typeof value === 'string') {
        var id = textPool.getId(value);
        if (!!id) {
            return { $innerHTML: id };
        }
    }
    return value;
}; };
exports.replaceFactory = replaceFactory;
//# sourceMappingURL=TextUtils.js.map