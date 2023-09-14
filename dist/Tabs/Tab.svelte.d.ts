/** @typedef {typeof __propDef.props}  TabProps */
/** @typedef {typeof __propDef.events}  TabEvents */
/** @typedef {typeof __propDef.slots}  TabSlots */
export default class Tab extends SvelteComponentTyped<{
    [x: string]: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TabProps = typeof __propDef.props;
export type TabEvents = typeof __propDef.events;
export type TabSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
