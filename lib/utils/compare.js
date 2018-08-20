"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line:no-unbound-method
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 */
// tslint:disable-next-line:max-line-length
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
function is(x, y) {
    // SameValue algorithm
    if (x === y) {
        // Steps 1-5, 7-10
        // Steps 6.b-6.e: +0 != -0
        // Added the nonzero y check to make Flow happy, but it is redundant
        return x !== 0 || y !== 0 || 1 / x === 1 / y;
    }
    else {
        // Step 6.a: NaN == NaN
        return x !== x && y !== y;
    }
}
/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
        return true;
    }
    if (typeof objA !== 'object' ||
        objA === null ||
        typeof objB !== 'object' ||
        objB === null) {
        return false;
    }
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    for (var _i = 0, keysA_1 = keysA; _i < keysA_1.length; _i++) {
        var i = keysA_1[_i];
        if (!hasOwnProperty.call(objB, i) || !is(objA[i], objB[i])) {
            return false;
        }
    }
    return true;
}
exports.shallowEqual = shallowEqual;
//# sourceMappingURL=compare.js.map