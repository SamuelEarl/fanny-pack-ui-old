import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        tabStyle?: string;
        marginBottom?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type TabBarProps = typeof __propDef.props;
export type TabBarEvents = typeof __propDef.events;
export type TabBarSlots = typeof __propDef.slots;
export default class TabBar extends SvelteComponentTyped<TabBarProps, TabBarEvents, TabBarSlots> {
}
export {};
