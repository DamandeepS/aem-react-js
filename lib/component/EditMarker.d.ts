/// <reference types="react" />
import * as React from 'react';
import { AemComponent } from './AemComponent';
export interface EditMarkerProps {
    readonly label?: string;
}
export declare class EditMarker extends AemComponent<EditMarkerProps, any> {
    render(): React.ReactElement<any>;
}
