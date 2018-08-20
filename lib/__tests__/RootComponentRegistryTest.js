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
var ComponentManager_1 = require("../ComponentManager");
var ComponentRegistry_1 = require("../ComponentRegistry");
var RootComponentRegistry_1 = require("../RootComponentRegistry");
var ResourceComponent_1 = require("../component/ResourceComponent");
describe('RootComponentRegistry', function () {
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
    var actualResourceType = '/components/test-view';
    it('should register component', function () {
        var rootRegistry = new RootComponentRegistry_1.RootComponentRegistry();
        var registry = new ComponentRegistry_1.ComponentRegistry('/components');
        registry.register(TestView);
        rootRegistry.add(registry);
        rootRegistry.init();
        var component = rootRegistry.getComponent(actualResourceType, []);
        chai_1.expect(component).to.equal(TestView);
        component = new ComponentManager_1.ComponentManager(rootRegistry, null).getComponent(actualResourceType);
        chai_1.expect(component).to.equal(TestView);
        var resourceType = rootRegistry.getResourceType(TestView);
        chai_1.expect(resourceType).to.equal(actualResourceType);
        resourceType = new ComponentManager_1.ComponentManager(rootRegistry, null).getResourceType(TestView);
        chai_1.expect(resourceType).to.equal(actualResourceType);
    });
    it('should register vanilla component', function () {
        var rootRegistry = new RootComponentRegistry_1.RootComponentRegistry();
        var registry = new ComponentRegistry_1.ComponentRegistry('/components');
        registry.registerVanilla({ component: TestView });
        rootRegistry.add(registry);
        rootRegistry.init();
        var component = rootRegistry.getComponent(actualResourceType, []);
        chai_1.expect(component).to.not.be.null;
        var resourceType = rootRegistry.getResourceType(TestView);
        chai_1.expect(resourceType).to.be.undefined;
    });
    it('should register vanilla component with selector', function () {
        var rootRegistry = new RootComponentRegistry_1.RootComponentRegistry();
        var registry = new ComponentRegistry_1.ComponentRegistry('/components');
        registry.registerVanilla({ component: TestView, selector: 'special' });
        rootRegistry.add(registry);
        rootRegistry.init();
        var component = rootRegistry.getComponent(actualResourceType, ['x']);
        chai_1.expect(component).to.be.undefined;
        var specialComponent = rootRegistry.getComponent(actualResourceType, [
            'special'
        ]);
        chai_1.expect(specialComponent).to.not.be.undefined;
        var resourceType = rootRegistry.getResourceType(TestView);
        chai_1.expect(resourceType).to.be.undefined;
    });
});
//# sourceMappingURL=RootComponentRegistryTest.js.map