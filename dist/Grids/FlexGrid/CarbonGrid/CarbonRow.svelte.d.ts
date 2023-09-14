/** @typedef {typeof __propDef.props}  CarbonRowProps */
/** @typedef {typeof __propDef.events}  CarbonRowEvents */
/** @typedef {typeof __propDef.slots}  CarbonRowSlots */
export default class CarbonRow extends SvelteComponentTyped<{
    [x: string]: any;
    padding?: boolean;
    narrow?: boolean;
    as?: boolean;
    noGutter?: boolean;
    noGutterLeft?: boolean;
    noGutterRight?: boolean;
    condensed?: boolean;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type CarbonRowProps = typeof __propDef.props;
export type CarbonRowEvents = typeof __propDef.events;
export type CarbonRowSlots = typeof __propDef.slots;
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
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
