"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextPool = (function () {
    function TextPool() {
        this.map = Object.create(null);
        this.ids = {};
        this.prefix = 'text_';
    }
    TextPool.prototype.put = function (text, root) {
        var existingId = this.getId(text);
        if (existingId) {
            return existingId;
        }
        var id = this.nextId(root);
        this.map[text] = id;
        return id;
    };
    TextPool.prototype.getId = function (text) {
        var id = this.map[text];
        return id;
    };
    TextPool.prototype.nextId = function (root) {
        var id = this.ids[root];
        if (typeof id === 'undefined') {
            id = 0;
        }
        else {
            id++;
        }
        this.ids[root] = id;
        return "" + this.prefix + root + "_" + String(id);
    };
    return TextPool;
}());
exports.TextPool = TextPool;
//# sourceMappingURL=TextPool.js.map