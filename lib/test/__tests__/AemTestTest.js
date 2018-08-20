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
var ComponentRegistry_1 = require("../../ComponentRegistry");
var ReactParsys_1 = require("../../component/ReactParsys");
var ResourceComponent_1 = require("../../component/ResourceComponent");
var AemTest_1 = require("../AemTest");
describe('AemTest', function () {
    var Text = (function (_super) {
        __extends(Text, _super);
        function Text() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Text.prototype.renderBody = function () {
            var text = this.getResource()
                ? this.getResource().text
                : 'unknown';
            return (React.createElement("span", null, text));
        };
        return Text;
    }(ResourceComponent_1.ResourceComponent));
    var registry = new ComponentRegistry_1.ComponentRegistry('/components');
    registry.register(Text);
    registry.register(ReactParsys_1.ReactParsys);
    var aemTest = new AemTest_1.AemTest();
    aemTest.addRegistry(registry);
    aemTest.init();
    it('should render Text', function () {
        var wrapper = aemTest.render({
            resourceType: '/components/text',
            text: 'Hallo'
        });
        chai_1.expect(wrapper.html()).to.equal('Hallo');
    });
});
//# sourceMappingURL=AemTestTest.js.map