import { SvelteComponentTyped } from "svelte";
export declare let ACCORDION_KEY: symbol;
declare const __propDef: {
    props: {
        border?: boolean;
        groupPadding?: string;
        accordionTitlePadding?: string;
        fontSize?: string;
        spaceBetweenAccordions?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type AccordionGroupProps = typeof __propDef.props;
export type AccordionGroupEvents = typeof __propDef.events;
export type AccordionGroupSlots = typeof __propDef.slots;
export default class AccordionGroup extends SvelteComponentTyped<AccordionGroupProps, AccordionGroupEvents, AccordionGroupSlots> {
}
export {};
