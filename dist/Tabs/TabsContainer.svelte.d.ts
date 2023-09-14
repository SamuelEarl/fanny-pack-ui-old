export let TABS_KEY: symbol;
/** @typedef {typeof __propDef.props}  TabsContainerProps */
/** @typedef {typeof __propDef.events}  TabsContainerEvents */
/** @typedef {typeof __propDef.slots}  TabsContainerSlots */
export default class TabsContainer extends SvelteComponentTyped<{
    border?: boolean;
    containerPadding?: string;
    tabPadding?: string;
    tabFontSize?: string;
    panelPadding?: string;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type TabsContainerProps = typeof __propDef.props;
export type TabsContainerEvents = typeof __propDef.events;
export type TabsContainerSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        border?: boolean;
        containerPadding?: string;
        tabPadding?: string;
        tabFontSize?: string;
        panelPadding?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
