import { XssApi } from './XssApi';
import { Context, XssUtils } from './XssUtils';
export declare class JavaXssUtils implements XssUtils {
    private readonly xssApi;
    constructor(xssApi: XssApi);
    processText(text: string, context?: Context): string;
    private escapeHtml(text);
}
