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
var PropTypes = require("prop-types");
var React = require("react");
var RootComponentRegistry_1 = require("../../RootComponentRegistry");
var Container_1 = require("../../di/Container");
var Cache_1 = require("../../store/Cache");
var MockSling_1 = require("../../test/MockSling");
var EditDialog_1 = require("../EditDialog");
describe('EditDialog', function () {
    var Wrapper = (function (_super) {
        __extends(Wrapper, _super);
        function Wrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Wrapper.prototype.getChildContext = function () {
            return {
                aemContext: this.props.aemContext
            };
        };
        Wrapper.prototype.render = function () {
            return (React.createElement("div", null, this.props.children));
        };
        Wrapper.childContextTypes = {
            aemContext: PropTypes.any
        };
        return Wrapper;
    }(React.Component));
    it('should render wrapper element', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = enzyme.mount(React.createElement(Wrapper, { aemContext: { container: container, registry: new RootComponentRegistry_1.RootComponentRegistry() } },
            React.createElement(EditDialog_1.EditDialog, { path: "/test", resourceType: "components/test" })));
        chai_1.expect(item.html()).to.equal('<div><div class="dialog"></div></div>');
    });
    it('should render wrapper element with extra className', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache));
        var item = enzyme.mount(React.createElement(Wrapper, { aemContext: { container: container, registry: new RootComponentRegistry_1.RootComponentRegistry() } },
            React.createElement(EditDialog_1.EditDialog, { className: "hi", path: "/test", resourceType: "components/test" })));
        chai_1.expect(item.html()).to.equal('<div><div class="dialog hi"></div></div>');
    });
    it('should render wrapper element ' +
        'with extra className and existing className', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache, {
            child: {
                element: 'script',
                html: 'Cq.makeEditable()'
            },
            element: 'ul'
        }));
        var item = enzyme.mount(React.createElement(Wrapper, { aemContext: { container: container, registry: new RootComponentRegistry_1.RootComponentRegistry() } },
            React.createElement(EditDialog_1.EditDialog, { path: "/test", resourceType: "components/test" })));
        chai_1.expect(item.html()).to.equal('<div><ul><script>Cq.makeEditable()</script></ul></div>');
    });
    it('should render classic ui', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache, {
            attributes: {
                className: 'more react-parsys'
            },
            child: {
                attributes: {
                    type: 'text/javascript'
                },
                child: null,
                element: 'script',
                html: 'CQ.WCM.edit();'
            },
            element: 'div',
            html: null
        }));
        var item = enzyme.mount(React.createElement(Wrapper, { aemContext: { container: container, registry: new RootComponentRegistry_1.RootComponentRegistry() } },
            React.createElement(EditDialog_1.EditDialog, { path: "/test", resourceType: "components/test" })));
        chai_1.expect(item.html()).to.equal('<div><div class="more react-parsys">' +
            '<script type="text/javascript">CQ.WCM.edit();</script></div></div>');
    });
    it('should render touch ui', function () {
        var cache = new Cache_1.Cache();
        var container = new Container_1.Container(cache, new MockSling_1.MockSling(cache, {
            child: {
                attributes: {
                    'data-config': '{"path":"/content"}',
                    'data-path': '/content/'
                },
                child: null,
                element: 'cq',
                html: ''
            },
            element: 'div',
            html: null
        }));
        var item = enzyme.mount(React.createElement(Wrapper, { aemContext: { container: container, registry: new RootComponentRegistry_1.RootComponentRegistry() } },
            React.createElement(EditDialog_1.EditDialog, { path: "/test", resourceType: "components/test" })));
        chai_1.expect(item.html()).to.equal('<div><div><cq data-config="{&quot;path&quot;:&quot;/content&quot;}" ' +
            'data-path="/content/"></cq></div></div>');
    });
});
//# sourceMappingURL=EditDialogTest.js.map