"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var RootComponent_1 = require("./component/RootComponent");
var TextUtils_1 = require("./component/text/TextUtils");
/**
 * The Component
 */
var ComponentManager = (function () {
    function ComponentManager(registry, container) {
        this.container = container;
        this.registry = registry;
    }
    /**
     * Initialize react component in dom.
     * @param item
     */
    ComponentManager.prototype.initReactComponent = function (item, options, reviverFn, id) {
        if (options === void 0) { options = {}; }
        var nextItem = item.nextSibling;
        while (nextItem && nextItem.nodeName.toLocaleLowerCase() !== 'textarea') {
            nextItem = nextItem.nextSibling;
        }
        if (!nextItem) {
            throw new Error('cannot find textarea for component');
        }
        var textarea = nextItem;
        if (textarea) {
            var props = JSON.parse(textarea.value, reviverFn);
            this.container.cache.mergeCache(props.cache);
            if ((options.shouldStartReact && options.shouldStartReact(props)) ||
                props.wcmmode === 'disabled') {
                var component = this.registry.getComponent(props.resourceType, props.selectors);
                if (!component) {
                    console.error("React component '" + props.resourceType + "' " +
                        'does not exist in component list.');
                }
                else {
                    var ctx = {
                        container: this.container,
                        registry: this.registry
                    };
                    var root = this.registry.rootDecorator(React.createElement(RootComponent_1.RootComponent, { aemContext: ctx, component: component, selectors: props.selectors, id: id, path: props.path, wcmmode: props.wcmmode }));
                    ReactDom.hydrate(root, item);
                }
            }
        }
        else {
            console.error("React config with id '" + item.getAttribute('data-react-id') + "' " +
                'has no corresponding textarea element.');
        }
    };
    ComponentManager.prototype.getResourceType = function (component) {
        return this.registry.getResourceType(component);
    };
    ComponentManager.prototype.getComponent = function (resourceType, selectors) {
        return this.registry.getComponent(resourceType, selectors || []);
    };
    /**
     * find all root elements and initialize the react components
     */
    ComponentManager.prototype.initReactComponents = function (el, options) {
        var _this = this;
        var reviverFn = TextUtils_1.reviveFactory(el);
        var items = [].slice.call(el.querySelectorAll('[data-react]'));
        items.forEach(function (item, index) {
            _this.initReactComponent(item, options, reviverFn, String(index));
        });
        return items.length;
    };
    return ComponentManager;
}());
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map