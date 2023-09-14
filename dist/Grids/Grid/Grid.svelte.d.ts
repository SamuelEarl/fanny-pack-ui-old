import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        colGutter?: number;
        rowGutter?: number;
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
export type GridProps = typeof __propDef.props;
export type GridEvents = typeof __propDef.events;
export type GridSlots = typeof __propDef.slots;
export default class Grid extends SvelteComponentTyped<GridProps, GridEvents, GridSlots> {
}
export {};
