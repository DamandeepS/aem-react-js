"use strict";
/* tslint:disable no-any no-unused-expression */
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var ResourceUtils_1 = require("../ResourceUtils");
describe('ResourceUtils', function () {
    it('should return the containing page path', function () {
        var pagePath = ResourceUtils_1.ResourceUtils.getContainingPagePath('/content/world/jcr:content/par/xxx.html');
        chai_1.expect(pagePath).to.equal('/content/world.html');
    });
    it('should leave pagePath as is', function () {
        var pagePath = ResourceUtils_1.ResourceUtils.getContainingPagePath('/content/world.html');
        chai_1.expect(pagePath).to.equal('/content/world.html');
    });
    it('should return children which are objects with a primaryType prop', function () {
        var test = { child1: { 'sling:resourceType': '1' }, value: 'hallo' };
        var children = ResourceUtils_1.ResourceUtils.getChildren(test);
        chai_1.expect(Object.keys(children).length).to.equal(1);
        chai_1.expect(children.child1['sling:resourceType']).to.equal('1');
    });
    it('should return value for path', function () {
        var test = { a: { b: 1 } };
        var value = ResourceUtils_1.ResourceUtils.getProperty(test, ['a', 'b']);
        chai_1.expect(value).to.equal(1);
    });
    it('should return null if path does not exist', function () {
        var test = { a: { b: 1 } };
        var value = ResourceUtils_1.ResourceUtils.getProperty(test, ['a', 'b', 'c']);
        chai_1.expect(value).to.be.null;
    });
    it('should recognize absolute path', function () {
        var value = ResourceUtils_1.ResourceUtils.isAbsolutePath('/a/b');
        chai_1.expect(value).to.be.true;
    });
    it('should recognize relative path', function () {
        var value = ResourceUtils_1.ResourceUtils.isAbsolutePath('a/b');
        chai_1.expect(value).to.be.false;
    });
    it('should find ancestor by depth', function () {
        var value = ResourceUtils_1.ResourceUtils.findAncestor('/a/b/c', 2);
        chai_1.expect(value.path).to.equal('/a');
        chai_1.expect(value.subPath).to.deep.equal(['c', 'b']);
    });
    it('should create same path', function () {
        var value = ResourceUtils_1.ResourceUtils.createPath('/content/a', '.');
        chai_1.expect(value).to.equal('/content/a');
    });
    it('should create relative path', function () {
        var value = ResourceUtils_1.ResourceUtils.createPath('/content/a', 'x');
        chai_1.expect(value).to.equal('/content/a/x');
    });
    it('should create absolute path', function () {
        var value = ResourceUtils_1.ResourceUtils.createPath('/content/a', '/content/b/x');
        chai_1.expect(value).to.equal('/content/b/x');
    });
});
//# sourceMappingURL=ResourceUtilsTest.js.map