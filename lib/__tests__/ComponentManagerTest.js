"use strict";
// tslint:disable no-any
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var jsdom_1 = require("jsdom");
var React = require("react");
var ComponentManager_1 = require("../ComponentManager");
var ResourceComponent_1 = require("../component/ResourceComponent");
var TextUtils_1 = require("../component/text/TextUtils");
var Container_1 = require("../di/Container");
var rootDecorator_1 = require("../rootDecorator");
var Cache_1 = require("../store/Cache");
var MockSling_1 = require("../test/MockSling");
describe('ComponentManager', function () {
    it('should not install components when wcmmode is not disabled', function () {
        var cache = new Cache_1.Cache();
        var data = {
            cache: cache,
            path: '/test',
            resourceType: '/components/test',
            selectors: [],
            wcmmode: 'edit'
        };
        var doc = new jsdom_1.JSDOM('<html><div data-react></div><textarea>' +
            (JSON.stringify(data) + "</textarea></html>")).window.document;
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var cm = new ComponentManager_1.ComponentManager(null, container);
        var element = doc.querySelector('[data-react]');
        cm.initReactComponent(element, {}, TextUtils_1.reviveFactory(doc.body), '1');
    });
    it('should instantiate react components', function () {
        var Test = (function (_super) {
            __extends(Test, _super);
            function Test() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Test.prototype.renderBody = function () {
                return React.createElement("span", null, "test");
            };
            return Test;
        }(ResourceComponent_1.ResourceComponent));
        var cache = new Cache_1.Cache();
        var data = {
            cache: cache,
            path: '/test',
            resourceType: '/components/test',
            selectors: [],
            wcmmode: 'disabled'
        };
        var container = new Container_1.Container(cache, {
            load: function (listener, path, options) {
                listener({});
            }
        });
        var registry = {
            getComponent: function (resourceType) { return Test; },
            rootDecorator: rootDecorator_1.identity
        };
        var doc = new jsdom_1.JSDOM("<html><div data-react></div>Shouldn't be here<textarea>" +
            (JSON.stringify(data) + "</textarea></html>")).window.document;
        var cm = new ComponentManager_1.ComponentManager(registry, container);
        var element = doc.querySelector('[data-react]');
        cm.initReactComponent(element, {}, TextUtils_1.reviveFactory(doc.body), '1');
        var count = cm.initReactComponents(doc.body);
        chai_1.expect(count).to.equal(1);
    });
});
//# sourceMappingURL=ComponentManagerTest.js.map