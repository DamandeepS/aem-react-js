"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var enzyme = require("enzyme");
var Adapter = require("enzyme-adapter-react-16");
var React = require("react");
var RootComponentRegistry_1 = require("../RootComponentRegistry");
var RootComponent_1 = require("../component/RootComponent");
var Container_1 = require("../di/Container");
var Cache_1 = require("../store/Cache");
var MockSling_1 = require("./MockSling");
enzyme.configure({ adapter: new Adapter() });
var AemTest = (function () {
    function AemTest() {
        this.registry = new RootComponentRegistry_1.RootComponentRegistry();
    }
    AemTest.prototype.init = function () {
        this.registry.init();
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        this.currentAemContext = {
            container: container,
            registry: this.registry
        };
    };
    AemTest.prototype.addRegistry = function (registry) {
        this.registry.add(registry);
    };
    AemTest.prototype.addResource = function (path, resource, depth) {
        var cache = this.currentAemContext.container.cache;
        cache.put(path, resource, depth);
    };
    AemTest.prototype.render = function (resource, path, selectors) {
        if (path === void 0) { path = '/'; }
        if (selectors === void 0) { selectors = []; }
        this.addResource(path, resource);
        var component = this.registry.getComponent(resource.resourceType, selectors);
        if (!component) {
            throw new Error('cannot find component for ' + String(resource.resourceType));
        }
        return enzyme.render(React.createElement(RootComponent_1.RootComponent, { component: component, id: "root", path: path || '/', wcmmode: "disabled", aemContext: this.currentAemContext, selectors: selectors }));
    };
    return AemTest;
}());
exports.AemTest = AemTest;
//# sourceMappingURL=AemTest.js.map