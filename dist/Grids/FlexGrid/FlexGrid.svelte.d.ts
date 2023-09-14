import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        colGutter?: number;
        rowGutter?: number;
        rowMarginsY?: number;
        rowMarginsX?: number;
        colPaddingY?: number;
        colPaddingX?: number;
        equalColWidths?: boolean;
        contain?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type FlexGridProps = typeof __propDef.props;
export type FlexGridEvents = typeof __propDef.events;
export type FlexGridSlots = typeof __propDef.slots;
export default class FlexGrid extends SvelteComponentTyped<FlexGridProps, FlexGridEvents, FlexGridSlots> {
}
export {};
