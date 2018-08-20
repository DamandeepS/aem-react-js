"use strict";
/* tslint:disable no-any no-unused-expression */
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var Cache_1 = require("../Cache");
var ServerSling_1 = require("../ServerSling");
describe('ServerSling', function () {
    it('should include resource', function () {
        var html = '<div></div>';
        var cache = new Cache_1.Cache();
        var javaSling = {
            includeResource: function (path, resourceType, addSelectors, selectors, decorationTagName) {
                return html;
            }
        };
        var sling = new ServerSling_1.ServerSling(cache, javaSling);
        var actualHtml = sling.includeResource('/test', null, '/component/test', {});
        chai_1.expect(actualHtml).to.equal(html);
        chai_1.expect(cache.getIncluded('/test', null)).to.equal(html);
    });
    it('should subscribe to resource', function () {
        var resource = { text: 'hi' };
        var path = '/test';
        var actualResource;
        var cache = new Cache_1.Cache();
        var javaSling = {
            getResource: function (_path, depth) {
                if (_path === path && depth === 3) {
                    return JSON.stringify(resource);
                }
                else {
                    return null;
                }
            }
        };
        var sling = new ServerSling_1.ServerSling(cache, javaSling);
        var listener = function (_resource) {
            actualResource = _resource;
        };
        sling.load(listener, path, {
            depth: 3,
            selectors: []
        });
        chai_1.expect(actualResource).to.deep.equal(resource);
    });
    it('should include dialog', function () {
        var dialog = { element: 'el' };
        var cache = new Cache_1.Cache();
        var javaSling = {
            renderDialogScript: function (path, resourceType) {
                return JSON.stringify(dialog);
            }
        };
        var sling = new ServerSling_1.ServerSling(cache, javaSling);
        var actualDialog = sling.renderDialogScript('/test', '/component/test');
        chai_1.expect(actualDialog).to.deep.equal(dialog);
        chai_1.expect(cache.getScript('/test')).to.deep.equal(dialog);
    });
    it('should include null dialog', function () {
        var cache = new Cache_1.Cache();
        var javaSling = {
            renderDialogScript: function (path, resourceType) {
                return null;
            }
        };
        var sling = new ServerSling_1.ServerSling(cache, javaSling);
        var actualDialog = sling.renderDialogScript('/test', '/component/test');
        chai_1.expect(actualDialog).to.be.null;
    });
    it('should get path', function () {
        var path = '/test';
        var javaSling = {
            getPagePath: function () {
                return path;
            }
        };
        var sling = new ServerSling_1.ServerSling(null, javaSling);
        var actualPath = sling.getRequestPath();
        chai_1.expect(actualPath).to.equal(path);
    });
});
//# sourceMappingURL=ServerSlingTest.js.map