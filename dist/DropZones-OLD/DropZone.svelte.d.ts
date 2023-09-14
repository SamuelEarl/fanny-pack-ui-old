/** @typedef {typeof __propDef.props}  DropZoneProps */
/** @typedef {typeof __propDef.events}  DropZoneEvents */
/** @typedef {typeof __propDef.slots}  DropZoneSlots */
export default class DropZone extends SvelteComponentTyped<{
    accept: any;
    disabled?: boolean;
    minSize?: number;
    maxSize?: number;
    multiple?: boolean;
    uploadIcon?: string;
    getFilesFromEvent?: any;
    preventDropOnDocument?: boolean;
    noClick?: boolean;
    noKeyboard?: boolean;
    noDrag?: boolean;
    noDragEventsBubbling?: boolean;
    disableDefaultStyles?: boolean;
}, {
    dragenter: CustomEvent<any>;
    dragover: CustomEvent<any>;
    dragleave: CustomEvent<any>;
    filedropped: CustomEvent<any>;
    drop: CustomEvent<any>;
    droprejected: CustomEvent<any>;
    dropaccepted: CustomEvent<any>;
    filedialogcancel: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type DropZoneProps = typeof __propDef.props;
export type DropZoneEvents = typeof __propDef.events;
export type DropZoneSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        accept: any;
        disabled?: boolean;
        minSize?: number;
        maxSize?: number;
        multiple?: boolean;
        uploadIcon?: string;
        getFilesFromEvent?: any;
        preventDropOnDocument?: boolean;
        noClick?: boolean;
        noKeyboard?: boolean;
        noDrag?: boolean;
        noDragEventsBubbling?: boolean;
        disableDefaultStyles?: boolean;
    };
    events: {
        dragenter: CustomEvent<any>;
        dragover: CustomEvent<any>;
        dragleave: CustomEvent<any>;
        filedropped: CustomEvent<any>;
        drop: CustomEvent<any>;
        droprejected: CustomEvent<any>;
        dropaccepted: CustomEvent<any>;
        filedialogcancel: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
