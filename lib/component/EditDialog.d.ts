/// <reference types="react" />
import * as React from 'react';
import { AemComponent } from './AemComponent';
export interface EditDialogProps {
    readonly path: string;
    readonly resourceType: string;
    readonly className?: string;
}
export declare class EditDialog extends AemComponent<EditDialogProps, any> {
    render(): React.ReactElement<any>;
    private createWrapperElement(dialog);
}
