"use strict";
/* tslint:disable no-any no-unused-expression */
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
var React = require("react");
var ServerRenderer_1 = require("../ServerRenderer");
var ResourceComponent_1 = require("../component/ResourceComponent");
var Container_1 = require("../di/Container");
var rootDecorator_1 = require("../rootDecorator");
var Cache_1 = require("../store/Cache");
describe('ServerRenderer', function () {
    it('should render component', function () {
        var Test = (function (_super) {
            __extends(Test, _super);
            function Test() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Test.prototype.renderBody = function () {
                return (React.createElement("span", null, this.getResource().text));
            };
            return Test;
        }(ResourceComponent_1.ResourceComponent));
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, {
            load: function (listener, path) {
                listener({ text: 'hi' });
            }
        });
        var registry = {
            rootDecorator: rootDecorator_1.identity,
            getComponent: function (resourceType) {
                return Test;
            }
        };
        var renderer = new ServerRenderer_1.ServerRenderer(registry, container);
        var response = renderer.renderReactComponent('/test', '/components/test', 'disabled');
        chai_1.expect(response.html).to.equal('<span data-reactroot="">hi</span>');
    });
    it('should throw error if component is not found', function () {
        var registry = {
            rootDecorator: rootDecorator_1.identity,
            getComponent: function (resourceType) {
                return null;
            }
        };
        var renderer = new ServerRenderer_1.ServerRenderer(registry, null);
        var error = false;
        try {
            renderer.renderReactComponent('/test', '/components/test', 'disabled');
        }
        catch (e) {
            error = true;
        }
        chai_1.expect(error).to.be.true;
    });
});
//# sourceMappingURL=ServerRendererTest.js.map