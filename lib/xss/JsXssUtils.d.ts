import { Context, XssUtils } from './XssUtils';
export declare class JsXssUtils implements XssUtils {
    processText(text: string, context?: Context): string;
    private escapeHtml(text);
    private filterHTML(text);
}
