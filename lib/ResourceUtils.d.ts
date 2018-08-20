export declare class ResourceUtils {
    static readonly ABSOLUTE_PATH_PATTERN: RegExp;
    /**
     * returns only the properties of the given object
     * whoe have a property named sling:resourceType
     * @param resource the resource
     * @returns {any} the sub object
     */
    static getChildren(resource: any): any;
    static getProperty(data: any, path: string[]): any;
    static isAbsolutePath(path: string): boolean;
    static findAncestor(resourcePath: string, depth: number): PathResult;
    static getContainingPagePath(requestPath: string): string;
    static isSamePath(path: string): boolean;
    static createPath(contextPath: string, path: string): string;
}
export interface PathResult {
    path: string;
    subPath: string[];
}
