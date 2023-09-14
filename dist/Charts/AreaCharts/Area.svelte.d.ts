import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        yValueId: any;
        color?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type AreaProps = typeof __propDef.props;
export type AreaEvents = typeof __propDef.events;
export type AreaSlots = typeof __propDef.slots;
export default class Area extends SvelteComponentTyped<AreaProps, AreaEvents, AreaSlots> {
}
export {};
