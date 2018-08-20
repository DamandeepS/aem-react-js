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
var ComponentRegistry_1 = require("../../ComponentRegistry");
var RootComponentRegistry_1 = require("../../RootComponentRegistry");
var Container_1 = require("../../di/Container");
var Cache_1 = require("../../store/Cache");
var MockSling_1 = require("../../test/MockSling");
var ResourceComponent_1 = require("../ResourceComponent");
var RootComponent_1 = require("../RootComponent");
var VanillaInclude_1 = require("../VanillaInclude");
var WrapperFactory_1 = require("../WrapperFactory");
/*tslint:disable-next-line*/
require("../../test/setup");
describe('WrapperFactory', function () {
    var Test = (function (_super) {
        __extends(Test, _super);
        function Test() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Test.prototype.render = function () {
            return (React.createElement("span", { "data-global": this.props.global, "data-text": this.props.text }, this.props.children));
        };
        return Test;
    }(React.Component));
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
    var testRegistry = new ComponentRegistry_1.ComponentRegistry('components');
    var registry = new RootComponentRegistry_1.RootComponentRegistry();
    testRegistry.registerVanilla({ component: Text });
    registry.add(testRegistry);
    registry.init();
    it('should render simple vanilla component', function () {
        var cache = new Cache_1.Cache();
        cache.put('/test', { text: 'hallo' });
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var reactClass = WrapperFactory_1.WrapperFactory.createWrapper({ component: Test, props: { global: 'bye' } }, 'components/test');
        var item = enzyme.mount(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: reactClass, path: "/test", selectors: [] }));
        var html = item.html();
        chai_1.expect(html).to.equal('<span data-global="bye" data-text="hallo"></span>');
    });
    it('should render loading component', function () {
        var loader = function () { return React.createElement("span", null, "..."); };
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var reactClass = WrapperFactory_1.WrapperFactory.createWrapper({
            component: Test,
            loadingComponent: loader,
            props: { global: 'bye' }
        }, 'components/test');
        var item = enzyme.mount(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: reactClass, path: "/test", selectors: [] }));
        var html = item.html();
        chai_1.expect(html).to.equal('<div class="dialog"><span>...</span></div>');
    });
    it('should render default loading ui', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var reactClass = WrapperFactory_1.WrapperFactory.createWrapper({ component: Test, props: { global: 'bye' } }, 'components/test');
        var item = enzyme.mount(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: reactClass, path: "/test", selectors: [] }));
        var html = item.html();
        chai_1.expect(html).to.equal('<div class="dialog"><span>Loading</span></div>');
    });
    it('should render simple vanilla include', function () {
        var MyTest = (function (_super) {
            __extends(MyTest, _super);
            function MyTest() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MyTest.prototype.renderBody = function () {
                return (React.createElement("div", null,
                    React.createElement(VanillaInclude_1.VanillaInclude, { path: "vanilla", component: Text })));
            };
            return MyTest;
        }(ResourceComponent_1.ResourceComponent));
        var cache = new Cache_1.Cache();
        cache.put('/test', { vanilla: { text: 'good bye' } });
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = enzyme.mount(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: MyTest, path: "/test", selectors: [] }));
        var html = item.html();
        chai_1.expect(html).to.equal('<div><div class="dialog"><span>good bye</span></div></div>');
    });
    it('should render simple vanilla include with extraProps', function () {
        var MyTest = (function (_super) {
            __extends(MyTest, _super);
            function MyTest() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MyTest.prototype.renderBody = function () {
                return (React.createElement("div", null,
                    React.createElement(VanillaInclude_1.VanillaInclude, { path: "vanilla", component: Text, extraProps: { className: 'OOO' } })));
            };
            return MyTest;
        }(ResourceComponent_1.ResourceComponent));
        var cache = new Cache_1.Cache();
        cache.put('/test', { vanilla: { text: 'good bye' } });
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = enzyme.mount(React.createElement(RootComponent_1.RootComponent, { aemContext: { container: container, registry: registry }, component: MyTest, path: "/test", selectors: [] }));
        var html = item.html();
        chai_1.expect(html).to.equal('<div><div class="dialog"><span class="OOO">good bye</span></div></div>');
    });
    /*
    it('should render simple vanilla component with transform', () => {
      const transform = (api: JavaApi) => ({
        text: api.getRequestModel('test')
      });
  
      const cache = new Cache();
  
      cache.put('/test', {textProperty: 'hallo'});
  
      const container = new Container(cache, new MockSling(cache));
  
      const reactClass = WrapperFactory.createWrapper(
        {component: Text, transform},
        'components/text'
      );
  
      const item = enzyme.mount(
        <RootComponent
          aemContext={{container, registry}}
          component={reactClass}
          path="/test"
        />
      );
  
      const html: string = item.html();
  
      expect(html).to.equal('<span>hallo</span>');
    });
    */
    it('should render simple vanilla container', function () {
        var cache = new Cache_1.Cache();
        cache.put('/test', {
            children: {
                child: {
                    'sling:resourceType': 'components/text',
                    text: 'hey there'
                }
            }
        });
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var reactClass = WrapperFactory_1.WrapperFactory.createWrapper({
            component: Test,
            parsys: { path: 'children', selectors: [] },
            selector: ''
        }, 'components/test');
        var item = enzyme.mount(React.createElement(RootComponent_1.RootComponent, { wcmmode: "disabled", aemContext: { container: container, registry: registry }, component: reactClass, path: "/test", selectors: [] }));
        var html = item.html();
        chai_1.expect(html).to.equal('<span><div class="dialog"><span>hey there</span></div></span>');
    });
});
//# sourceMappingURL=WrapperFactoryTest.js.map