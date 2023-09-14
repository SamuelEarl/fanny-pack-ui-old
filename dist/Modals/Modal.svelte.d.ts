import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        title?: string;
        scrollingBody?: boolean;
        disabled?: boolean;
        showCloseButton?: boolean;
        contentBgColor?: string;
        headerFooterBorderColor?: string;
    };
    events: {
        closeModal: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        modalBody: {};
        modalFooterLeft: {};
        modalFooterRight: {};
    };
};
export type ModalProps = typeof __propDef.props;
export type ModalEvents = typeof __propDef.events;
export type ModalSlots = typeof __propDef.slots;
export default class Modal extends SvelteComponentTyped<ModalProps, ModalEvents, ModalSlots> {
}
export {};
