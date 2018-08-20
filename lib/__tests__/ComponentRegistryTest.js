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
var ComponentRegistry_1 = require("../ComponentRegistry");
var ResourceComponent_1 = require("../component/ResourceComponent");
describe('ComponentRegistry', function () {
    var TestView = (function (_super) {
        __extends(TestView, _super);
        function TestView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TestView.prototype.renderBody = function () {
            return (React.createElement("span", null, this.getResource().text));
        };
        return TestView;
    }(ResourceComponent_1.ResourceComponent));
    it('should register component', function () {
        var registry = new ComponentRegistry_1.ComponentRegistry('/components');
        registry.register(TestView);
        var mapping = registry.mappings[0];
        chai_1.expect(mapping.componentClass).to.equal(TestView);
        chai_1.expect(mapping.resourceType).to.equal('/components/test-view');
        chai_1.expect(mapping.vanillaClass).to.be.null;
    });
    it('should register component with special mapping', function () {
        var registry = new ComponentRegistry_1.ComponentRegistry(function (name) { return '/x/' + name; });
        registry.register(TestView);
        var mapping = registry.mappings[0];
        chai_1.expect(mapping.componentClass).to.equal(TestView);
        chai_1.expect(mapping.resourceType).to.equal('/x/TestView');
        chai_1.expect(mapping.vanillaClass).to.be.null;
    });
    it('should register vanilla component', function () {
        var registry = new ComponentRegistry_1.ComponentRegistry('/components/vanilla');
        registry.registerVanilla({ component: TestView });
        var mapping = registry.mappings[0];
        chai_1.expect(mapping.componentClass).to.not.equal(TestView);
        chai_1.expect(mapping.resourceType).to.equal('/components/vanilla/test-view');
        chai_1.expect(mapping.vanillaClass).to.equal(TestView);
    });
    it('should register vanilla component with selector', function () {
        var registry = new ComponentRegistry_1.ComponentRegistry('/components/vanilla');
        registry.registerVanilla({ component: TestView, selector: 'special' });
        var mapping = registry.mappings[0];
        chai_1.expect(mapping.componentClass).to.not.equal(TestView);
        chai_1.expect(mapping.resourceType).to.equal('/components/vanilla/test-view');
        chai_1.expect(mapping.vanillaClass).to.equal(TestView);
        chai_1.expect(mapping.selector).to.equal('special');
    });
    it('should register component with selector', function () {
        var registry = new ComponentRegistry_1.ComponentRegistry('/components/x');
        registry.register(TestView, 'testview', 'special');
        var mapping = registry.mappings[0];
        chai_1.expect(mapping.componentClass).to.equal(TestView);
        chai_1.expect(mapping.resourceType).to.equal('/components/x/testview');
        chai_1.expect(mapping.selector).to.equal('special');
    });
});
//# sourceMappingURL=ComponentRegistryTest.js.map