export declare class TextPool {
    private map;
    private ids;
    private readonly prefix;
    put(text: string, root: string): string;
    getId(text: string): string;
    private nextId(root);
}
