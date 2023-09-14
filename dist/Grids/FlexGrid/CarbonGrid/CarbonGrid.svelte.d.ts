/** @typedef {typeof __propDef.props}  CarbonGridProps */
/** @typedef {typeof __propDef.events}  CarbonGridEvents */
/** @typedef {typeof __propDef.slots}  CarbonGridSlots */
export default class CarbonGrid extends SvelteComponentTyped<{
    [x: string]: any;
    padding?: boolean;
    narrow?: boolean;
    as?: boolean;
    noGutter?: boolean;
    noGutterLeft?: boolean;
    noGutterRight?: boolean;
    condensed?: boolean;
    fullWidth?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type CarbonGridProps = typeof __propDef.props;
export type CarbonGridEvents = typeof __propDef.events;
export type CarbonGridSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        padding?: boolean;
        narrow?: boolean;
        as?: boolean;
        noGutter?: boolean;
        noGutterLeft?: boolean;
        noGutterRight?: boolean;
        condensed?: boolean;
        fullWidth?: boolean;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
