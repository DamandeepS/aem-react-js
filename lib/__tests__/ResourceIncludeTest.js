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
var React = require("react");
var ComponentRegistry_1 = require("../ComponentRegistry");
var ResourceInclude_1 = require("../ResourceInclude");
var ResourceComponent_1 = require("../component/ResourceComponent");
var AemTest_1 = require("../test/AemTest");
describe('ResourceInclude', function () {
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test.prototype.renderBody = function () {
            return (React.createElement("span", null,
                React.createElement(ResourceInclude_1.ResourceInclude, { path: "embed", resourceType: "/components/something" })));
        };
        return Test;
    }(ResourceComponent_1.ResourceComponent));
    var Test2 = (function (_super) {
        __extends(Test2, _super);
        function Test2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test2.prototype.renderBody = function () {
            return (React.createElement("span", null,
                React.createElement(ResourceInclude_1.ResourceInclude, { path: "embed", resourceType: "/components/text", extraProps: this.props.myClass })));
        };
        return Test2;
    }(ResourceComponent_1.ResourceComponent));
    var Test3 = (function (_super) {
        __extends(Test3, _super);
        function Test3() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test3.prototype.renderBody = function () {
            return (React.createElement("span", null,
                React.createElement(ResourceInclude_1.ResourceInclude, { path: "embed", resourceType: "/components/text", extraProps: this.props.myClass, options: { selectors: ['mobile'] } })));
        };
        return Test3;
    }(ResourceComponent_1.ResourceComponent));
    var Test4 = (function (_super) {
        __extends(Test4, _super);
        function Test4() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test4.prototype.renderBody = function () {
            return (React.createElement("span", null,
                React.createElement(ResourceInclude_1.ResourceInclude, { path: "embed", resourceType: "/components/text", extraProps: this.props.myClass, options: { addSelectors: ['mobile'] } })));
        };
        return Test4;
    }(ResourceComponent_1.ResourceComponent));
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Text.prototype.render = function () {
            return (React.createElement("span", { className: this.props.className }, this.props.text));
        };
        return Text;
    }(React.Component));
    var Text2 = (function (_super) {
        __extends(Text2, _super);
        function Text2() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Text2.prototype.render = function () {
            return (React.createElement("div", { className: this.props.className }, this.props.text));
        };
        return Text2;
    }(React.Component));
    var registry = new ComponentRegistry_1.ComponentRegistry('/components');
    registry.register(Test);
    registry.register(Test2);
    registry.register(Test3);
    registry.register(Test4);
    registry.registerVanilla({ component: Text, name: '/components/text' });
    registry.registerVanilla({
        component: Text2,
        name: '/components/text',
        selector: 'mobile'
    });
    var aemTest = new AemTest_1.AemTest();
    aemTest.addRegistry(registry);
    aemTest.init();
    it('should render included resource', function () {
        var wrapper = aemTest.render({ resourceType: '/components/test' });
        chai_1.expect(wrapper.html()).to.equal('<div data-react-text="text_root_0">' +
            '<include resourcetype="/components/something" ' +
            'selectors="" path="//embed">' +
            '</include>' +
            '</div>');
    });
    it('should render included vanilla resource', function () {
        var wrapper = aemTest.render({
            embed: { text: 'hallo', className: 'myClass' },
            resourceType: '/components/test2'
        }, '/content');
        chai_1.expect(wrapper.html()).to.equal('<div class="dialog"><span class="myClass">hallo</span></div>');
    });
    it('should render included vanilla resource with unknown selectors', function () {
        var wrapper = aemTest.render({
            embed: { text: 'hallo', className: 'myClass' },
            resourceType: '/components/test2'
        }, '/content', ['x', 'y']);
        chai_1.expect(wrapper.html()).to.equal('<div class="dialog"><span class="myClass">hallo</span></div>');
    });
    it('should render included vanilla resource ' +
        'with selector inherited from root', function () {
        var wrapper = aemTest.render({
            embed: { text: 'hallo', className: 'myClass' },
            resourceType: '/components/test2'
        }, '/content', ['mobile']);
        chai_1.expect(wrapper.html()).to.equal('<div class="dialog"><div class="myClass">hallo</div></div>');
    });
    it('should render included vanilla resource with selector ' +
        'explicitly passed to ResourceInclude via addSelectors', function () {
        var wrapper = aemTest.render({
            embed: { text: 'hallo', className: 'myClass' },
            resourceType: '/components/test3'
        }, '/content', ['x']);
        chai_1.expect(wrapper.html()).to.equal('<div class="dialog"><div class="myClass">hallo</div></div>');
    });
    it('should render included vanilla resource with selector ' +
        'explicitly passed to ResourceInclude', function () {
        var wrapper = aemTest.render({
            embed: { text: 'hallo', className: 'myClass' },
            resourceType: '/components/test4'
        }, '/content', ['x']);
        chai_1.expect(wrapper.html()).to.equal('<div class="dialog"><div class="myClass">hallo</div></div>');
    });
});
//# sourceMappingURL=ResourceIncludeTest.js.map