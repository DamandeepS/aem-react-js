// tslint:disable no-any

import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import * as React from 'react';
import {ComponentManager, ComponentTreeConfig} from '../ComponentManager';
import {ResourceComponent} from '../component/ResourceComponent';
import {Container} from '../di/Container';
import {identity} from '../rootDecorator';
import {Cache} from '../store/Cache';
import {SlingResourceOptions} from '../store/Sling';
import {MockSling} from '../test/MockSling';

describe('ComponentManager', () => {
  it('should not install components when wcmmode is not disabled', () => {
    const cache = new Cache();

    const data: ComponentTreeConfig = {
      cache,
      path: '/test',
      resourceType: '/components/test',
      selectors: [],
      wcmmode: 'edit'
    };

    const doc: Document = new JSDOM(
      '<html><div data-react></div><textarea>' +
        `${JSON.stringify(data)}</textarea></html>`
    ).window.document;

    const container = new Container(cache, new MockSling(cache));
    const cm: ComponentManager = new ComponentManager(null, container, doc);
    const element: Element = doc.querySelector('[data-react]');

    cm.initReactComponent(element, {}, 'a');
  });

  it('should instantiate react components', () => {
    class Test extends ResourceComponent<any, any, any> {
      public renderBody(): React.ReactElement<any> {
        return <span>test</span>;
      }
    }

    const cache = new Cache();

    const data: ComponentTreeConfig = {
      cache,
      path: '/test',
      resourceType: '/components/test',
      selectors: [],
      wcmmode: 'disabled'
    };

    const container = new Container(
      cache,
      {
        load: (
          listener: (resource: any) => void,
          path: string,
          options?: SlingResourceOptions
        ) => {
          listener({});
        }
      } as any
    );

    const registry: any = {
      getComponent: (resourceType: string) => Test,
      rootDecorator: identity
    };

    const doc: Document = new JSDOM(
      "<html><div data-react></div>Shouldn't be here<textarea>" +
        `${JSON.stringify(data)}</textarea></html>`
    ).window.document;

    const cm: ComponentManager = new ComponentManager(registry, container, doc);
    const element: Element = doc.querySelector('[data-react]');

    cm.initReactComponent(element, {}, 'a');

    const count: number = cm.initReactComponents();

    expect(count).to.equal(1);
  });
});
