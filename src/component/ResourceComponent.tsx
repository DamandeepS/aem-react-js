import * as React from 'react';
import {AemComponent} from './AemComponent';
import {EditDialog} from './EditDialog';
import {Sling} from '../store/Sling';
import {RootComponentRegistry} from '../RootComponentRegistry';
import {ResourceUtils} from '../ResourceUtils';
import {ResourceInclude} from '../ResourceInclude';
import * as shallowCompare from 'react-addons-shallow-compare';

export interface Resource {
  'sling:resourceType': string;
}

export enum STATE {
  LOADING,
  LOADED,
  FAILED
}

export interface ResourceState {
  absolutePath: string;
  resource?: any;
  state: STATE;
}

export interface ResourceProps {
  path: string;
  skipRenderDialog?: boolean;
  root?: boolean;
  wcmmode?: string;
  className?: string;
}

/**
 * Provides base functionality for components that are
 */
export abstract class ResourceComponent<
  C extends Resource,
  P extends ResourceProps,
  S extends ResourceState
> extends AemComponent<P, S> {
  public static childContextTypes: any = {
    path: React.PropTypes.string, //
    wcmmode: React.PropTypes.string //
  };

  public getChildContext(): any {
    return {
      path: this.getPath(),
      wcmmode: this.getWcmmode()
    };
  }

  public shouldComponentUpdate(nextProps: P, nextState: S): boolean {
    return shallowCompare(this, nextProps, nextState);
  }

  public componentWillMount(): void {
    this.initialize();
  }

  public componentWillReceiveProps(): void {
    this.initialize();
  }

  public initialize(): void {
    let absolutePath: string;

    if (ResourceUtils.isAbsolutePath(this.props.path)) {
      absolutePath = this.props.path;
    } else {
      absolutePath = this.context.path + '/' + this.props.path;
    }

    if (absolutePath !== this.getPath()) {
      this.setState({absolutePath: absolutePath, state: STATE.LOADING} as S);

      (this.getAemContext().container.get(
        'sling'
      ) as Sling).subscribe(this, absolutePath, {depth: this.getDepth()});
    }
  }

  public getWcmmode(): string {
    return this.props.wcmmode || this.context.wcmmode;
  }

  public getPath(): string {
    if (typeof this.state !== 'undefined' && this.state !== null) {
      return this.state.absolutePath;
    } else {
      return null;
    }
  }

  protected renderLoading(): React.ReactElement<any> {
    return <span>Loading</span>;
  }

  public render(): React.ReactElement<any> {
    let child: React.ReactElement<any>;

    if (this.state.state === STATE.LOADING) {
      child = this.renderLoading();
    } else if (!!this.props.skipRenderDialog) {
      return this.renderBody();
    } else {
      child = this.renderBody();
    }

    return (
      <EditDialog
        path={this.getPath()}
        resourceType={this.getResourceType()}
        className={this.props.className}
      >
        {child}
      </EditDialog>
    );
  }

  public getRegistry(): RootComponentRegistry {
    return this.context.aemContext.registry;
  }

  public abstract renderBody(): React.ReactElement<any>;

  public getResource(): C {
    return this.state.resource as C;
  }

  public getResourceType(): string {
    return this.context.aemContext.registry.getResourceType(this);
  }

  public changedResource(path: string, resource: C): void {
    this.setState(
      {state: STATE.LOADED, resource: resource, absolutePath: path} as any
    );
  }

  protected getDepth(): number {
    return 0;
  }

  protected renderChildren(
    path: string,
    childClassName?: string,
    childElementName?: string
  ): React.ReactElement<any>[] {
    if (path && path.match(/^\//)) {
      throw new Error('path must be relative. was ' + path);
    }

    let childrenResource: any = !!path
      ? (this.getResource() as any)[path]
      : this.getResource();
    let children: any = ResourceUtils.getChildren(childrenResource);
    let childComponents: React.ReactElement<any>[] = [];
    let basePath: string = !!path ? path + '/' : '';

    // TODO alternatively create a div for each child and set className/elementName there

    Object.keys(children).forEach((nodeName: string, childIdx: number) => {
      let resource: Resource = children[nodeName];
      let resourceType: string = resource['sling:resourceType'];
      let actualPath: string = basePath + nodeName;
      let componentType: React.ComponentClass<
        any
      > = this.getRegistry().getComponent(resourceType);

      if (childElementName) {
        if (componentType) {
          let props: any = {
            key: nodeName,
            path: actualPath,
            reactKey: path,
            resource: resource
          };

          childComponents.push(
            React.createElement(
              childElementName as any,
              {
                className: childClassName,
                key: nodeName
              },
              React.createElement(componentType, props)
            )
          );
        } else {
          childComponents.push(
            React.createElement(
              childElementName as any,
              {
                className: childClassName,
                key: nodeName
              },
              React.createElement(ResourceInclude, {
                key: nodeName,
                path: actualPath,
                resourceType: resourceType
              })
            )
          );
        }
      } else {
        if (componentType) {
          let props: any = {
            className: childClassName,
            key: nodeName,
            path: basePath + nodeName,
            reactKey: path,
            resource: resource
          };

          childComponents.push(React.createElement(componentType, props));
        } else {
          childComponents.push(
            <ResourceInclude
              path={actualPath}
              key={nodeName}
              resourceType={resourceType}
            />
          );
        }
      }
    }, this);

    let newZone: React.ReactElement<any> = null;

    if (this.isWcmEnabled()) {
      let parsysPath = path ? path + '/*' : '*';
      let resourceType = 'foundation/components/parsys/new';

      newZone = (
        <ResourceInclude
          key="newZone"
          element="div"
          path={parsysPath}
          resourceType={resourceType}
        />
      );

      childComponents.push(newZone);
    }

    return childComponents;
  }
}
