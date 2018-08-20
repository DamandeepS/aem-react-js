import { ApiOptions, JavaApi } from '../component/JavaApi';
import { Container } from '../di/Container';
import { ServiceProxy } from '../di/ServiceProxy';
import { XssApi } from '../xss/XssApi';
export declare class JavaApiImpl implements JavaApi {
    private readonly container;
    private readonly path;
    private readonly selectors;
    constructor(path: string, selectors: string[], container: Container);
    getOsgiService(name: string): ServiceProxy;
    getResourceModel(name: string, options?: ApiOptions): ServiceProxy;
    getRequestModel(name: string, options?: ApiOptions): ServiceProxy;
    getPath(): string;
    getXssApi(): XssApi;
    private getServiceProxy(jsProxy);
}
declare type JavaApiFactory = (path: string, selectors: string[]) => JavaApi;
declare const javaApiFactoryFactory: (container: Container) => (path: string, selectors: string[]) => JavaApiImpl;
export { javaApiFactoryFactory, JavaApiFactory };
