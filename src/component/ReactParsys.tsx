import * as React from 'react';
import {IncludeOptions} from '../store/Sling';
import {ResourceComponent, ResourceProps} from './ResourceComponent';

export interface ReactParsysProps extends ResourceProps {
  readonly className?: string;
  readonly elementName?: string;
  readonly childClassName?: string;
  readonly childElementName?: string;
  readonly includeOptions?: IncludeOptions;
}

export class ReactParsys extends ResourceComponent<ReactParsysProps, any> {
  public renderBody(): React.ReactElement<any> {
    const children: React.ReactElement<any>[] = this.renderChildren(
      null,
      this.props.childClassName,
      this.props.childElementName
    );

    return React.createElement(
      this.props.elementName || ('div' as any),
      {className: this.props.className},
      children
    );
  }

  protected getDepth(): number {
    return 1;
  }
}
