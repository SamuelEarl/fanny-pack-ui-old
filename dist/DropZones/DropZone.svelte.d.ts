import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        handleFileUploads: any;
        accept?: string;
        dropZoneSelectFilesBtnIcon?: string;
        dragAndDropIcon?: string;
        dropZoneUploadFilesBtnIcon?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type DropZoneProps = typeof __propDef.props;
export type DropZoneEvents = typeof __propDef.events;
export type DropZoneSlots = typeof __propDef.slots;
export default class DropZone extends SvelteComponentTyped<DropZoneProps, DropZoneEvents, DropZoneSlots> {
}
export {};
