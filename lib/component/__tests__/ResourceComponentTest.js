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
var enzyme = require("enzyme");
var React = require("react");
var ReactTestUtils = require("react-dom/test-utils");
var ComponentRegistry_1 = require("../../ComponentRegistry");
var RootComponentRegistry_1 = require("../../RootComponentRegistry");
var Container_1 = require("../../di/Container");
var Cache_1 = require("../../store/Cache");
var MockSling_1 = require("../../test/MockSling");
var ResourceComponent_1 = require("../ResourceComponent");
var RootComponent_1 = require("../RootComponent");
/*tslint:disable-next-line*/
require("../../test/setup");
describe('ResourceComponent', function () {
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test.prototype.renderBody = function () {
            return (React.createElement("span", { className: "test" }, this.props.resource ? this.props.resource.text : 'unknown'));
        };
        return Test;
    }(ResourceComponent_1.ResourceComponent));
    var Embedded = (function (_super) {
        __extends(Embedded, _super);
        function Embedded() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Embedded.prototype.renderBody = function () {
            return React.createElement(Test, { path: "test" });
        };
        return Embedded;
    }(ResourceComponent_1.ResourceComponent));
    var AemContainer = (function (_super) {
        __extends(AemContainer, _super);
        function AemContainer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AemContainer.prototype.renderBody = function () {
            var children = this.renderChildren(this.props.childPath, this.props.childClassName, this.props.childElementName);
            return (React.createElement("div", { "data-container": true }, children));
        };
        return AemContainer;
    }(ResourceComponent_1.ResourceComponent));
    function createContainer(className, elementName, childPath) {
        return (function (_super) {
            __extends(AnonComponent, _super);
            function AnonComponent() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            AnonComponent.prototype.renderBody = function () {
                var children = this.renderChildren(childPath, className, elementName);
                return (React.createElement("div", { "data-container": true }, children));
            };
            return AnonComponent;
        }(ResourceComponent_1.ResourceComponent));
    }
    var testRegistry = new ComponentRegistry_1.ComponentRegistry();
    testRegistry.register(Test);
    var registry = new RootComponentRegistry_1.RootComponentRegistry();
    registry.add(testRegistry);
    registry.init();
    it('shouldComponentUpdate return false', function () {
        var props = {
            path: 'notfound'
        };
        var context = { path: '/content' };
        var state = {};
        var shouldUpdate = Embedded.prototype.shouldComponentUpdate.call({ props: props, state: state, context: context }, props, state, context);
        chai_1.expect(shouldUpdate).to.equal(false);
    });
    it('shouldComponentUpdate return true for simple prop', function () {
        var props = {
            path: '/content/notfound'
        };
        var nextProps = {
            path: '/page/first'
        };
        var state = {};
        var shouldUpdate = Embedded.prototype.shouldComponentUpdate.call({ props: props, state: state }, nextProps, state);
        chai_1.expect(shouldUpdate).to.equal(true);
    });
    it('shouldComponentUpdate return true for complex prop', function () {
        var props = {
            path: '/content/notfound',
            resource: '/my/resource'
        };
        var nextProps = {
            path: '/content/notfound',
            resource: '/my/second/resource'
        };
        var state = {};
        var shouldUpdate = Embedded.prototype.shouldComponentUpdate.call({ props: props, state: state }, nextProps, state);
        chai_1.expect(shouldUpdate).to.equal(true);
    });
    it('should render loading message', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = enzyme.mount(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: Test, path: "/content/notfound", selectors: [] }));
        chai_1.expect(item.find('span').html()).to.equal('<span>Loading</span>');
    });
    it('should get resource directly', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content/embed', {
            test: {
                text: 'Hallo'
            }
        });
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = ReactTestUtils.renderIntoDocument(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: Embedded, path: "/content/embed", selectors: [] }));
        var test = ReactTestUtils.findRenderedComponentWithType(item, Test);
        chai_1.expect(test.getPath()).to.equal('/content/embed/test');
        chai_1.expect(test.props.path).to.equal('test');
        chai_1.expect(test.getResource().text).to.equal('Hallo');
    });
    it('should load resource ', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content/embed', {}, 0);
        cache.put('/content/embed/test', {
            text: 'Hallo'
        }, 0);
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = ReactTestUtils.renderIntoDocument(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: Embedded, path: "/content/embed", selectors: [] }));
        var test = ReactTestUtils.findRenderedComponentWithType(item, Test);
        chai_1.expect(test.getPath()).to.equal('/content/embed/test');
        chai_1.expect(test.props.path).to.equal('test');
        chai_1.expect(test.getResource().text).to.equal('Hallo');
        var update = test.shouldComponentUpdate({ path: 'notloaded' }, {}, test.context);
        chai_1.expect(update).to.be.equal(true);
        test.componentWillUpdate({ path: 'notloaded' }, {}, test.context);
        chai_1.expect(test['loadingState']).to.equal(ResourceComponent_1.STATE.LOADING);
        test.changedResource({
            text: 'Bye Bye'
        });
        chai_1.expect(test['loadingState']).to.equal(ResourceComponent_1.STATE.LOADED);
    });
    it('should get resource from absolute Path', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content/test', { text: 'Hallo' });
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = ReactTestUtils.renderIntoDocument(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: Test, path: "/content/test", selectors: [] }));
        var test = ReactTestUtils.findRenderedComponentWithType(item, Test);
        chai_1.expect(test.getPath()).to.equal('/content/test');
        chai_1.expect(test.props.path).to.equal('/content/test');
        chai_1.expect(test.getResource().text).to.equal('Hallo');
    });
    it('should render htl children wcmmode disabled', function () {
        var cache = new Cache_1.Cache();
        cache.put('/content', {
            child1: {
                'jcr:primaryType': 'nt:unstructured',
                'sling:resourceType': 'htl/test',
                text: 'Hallo'
            }
        });
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = enzyme.render(React.createElement(RootComponent_1.RootComponent, { wcmmode: "disabled", aemContext: { container: container, registry: registry }, component: AemContainer, path: "/content", selectors: [] }));
        var include = item.find('include');
        chai_1.expect(include[0].attribs.path).to.equal('/content/child1');
        chai_1.expect(include[0].attribs.resourcetype).to.equal('htl/test');
    });
    describe('should render htl children wcmmode enabled', function () {
        var container;
        before(function () {
            var cache = new Cache_1.Cache();
            cache.put('/content', {
                child1: {
                    'jcr:primaryType': 'nt:unstructured',
                    'sling:resourceType': 'htl/test',
                    text: 'Hallo'
                }
            });
            container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        });
        it('default ', function () {
            var item = enzyme.render(React.createElement(RootComponent_1.RootComponent, { wcmmode: "edit", aemContext: { container: container, registry: registry }, component: AemContainer, path: "/content", selectors: [] }));
            var include = item.find('include');
            chai_1.expect(include[1].attribs.path).to.equal('/content/*');
            chai_1.expect(include[1].attribs.resourcetype).to.equal('foundation/components/parsys/new');
        });
        it('with child wrapper ', function () {
            var item = enzyme.mount(React.createElement(RootComponent_1.RootComponent, { wcmmode: "disabled", aemContext: { container: container, registry: registry }, component: createContainer('childClass', 'section'), id: "root", path: "/content", selectors: [] }));
            var dialog = item.find('section');
            chai_1.expect(dialog.props().className).to.equal('childClass');
            chai_1.expect(dialog.html()).to.equal('<section class="childClass"><div data-react-text="text_undefined_0">' +
                '<include resourcetype="htl/test" ' +
                'selectors="" path="/content/child1"></include></div></section>');
        });
    });
    describe('should render react children wcmmode disabled', function () {
        var container;
        before(function () {
            var cache = new Cache_1.Cache();
            cache.put('/content', {
                child1: {
                    'jcr:primaryType': 'nt:unstructured',
                    'sling:resourceType': 'test',
                    text: 'OOPS'
                }
            });
            container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        });
        it('default ', function () {
            var item = enzyme.render(React.createElement(RootComponent_1.RootComponent, { wcmmode: "disabled", aemContext: { container: container, registry: registry }, component: AemContainer, path: "/content", selectors: [] }));
            var test = item.find('.test');
            chai_1.expect(test[0].children[0].data).to.equal('OOPS');
        });
        it('with child wrapper', function () {
            var item = enzyme.render(React.createElement(RootComponent_1.RootComponent, { wcmmode: "disabled", aemContext: { container: container, registry: registry }, component: createContainer('childClass', 'el'), path: "/content", selectors: [] }));
            var test = item.find('el');
            chai_1.expect(test.length).to.equal(1);
            chai_1.expect(test[0].attribs.class).to.equal('childClass');
        });
        it('with child class name', function () {
            var item = enzyme.render(React.createElement(RootComponent_1.RootComponent, { wcmmode: "disabled", aemContext: { container: container, registry: registry }, component: createContainer('childClass'), path: "/content", selectors: [] }));
            var dialog = item.find('.dialog');
            chai_1.expect(dialog[0].attribs.class.split(' ')).to.contain('childClass');
        });
    });
    describe('should render react children with child path', function () {
        var container;
        before(function () {
            var cache = new Cache_1.Cache();
            cache.put('/content', {
                children: {
                    child1: {
                        'jcr:primaryType': 'nt:unstructured',
                        'sling:resourceType': 'test',
                        text: 'OOPS'
                    }
                }
            });
            container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        });
        it('with child path', function () {
            var item = enzyme.render(React.createElement(RootComponent_1.RootComponent, { wcmmode: "disabled", aemContext: { container: container, registry: registry }, component: createContainer('childClass', null, 'children'), path: "/content", selectors: [] }));
            var child = item.find('.test');
            chai_1.expect(child[0].children[0].data).to.equal('OOPS');
        });
    });
});
//# sourceMappingURL=ResourceComponentTest.js.map