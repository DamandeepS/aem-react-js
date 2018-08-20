"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JavaUtils = (function () {
    function JavaUtils() {
    }
    JavaUtils.convertArrayToJava = function (data) {
        if (typeof Java === 'undefined') {
            // for unit tests
            return data;
        }
        var ObjectArray = Java.type('java.lang.Object[]');
        var argsArray = new ObjectArray(data.length);
        data.forEach(function (item, idx) { return (argsArray[idx] = item); });
        return argsArray;
    };
    return JavaUtils;
}());
exports.JavaUtils = JavaUtils;
//# sourceMappingURL=JavaUtils.js.map