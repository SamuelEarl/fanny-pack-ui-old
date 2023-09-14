import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string;
        id?: string;
        options: any;
        optionLabel?: any;
        optgroup?: any;
        value: any;
        disabled?: boolean;
        padding?: string;
        fontSize?: string;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectCustomProps = typeof __propDef.props;
export type SelectCustomEvents = typeof __propDef.events;
export type SelectCustomSlots = typeof __propDef.slots;
export default class SelectCustom extends SvelteComponentTyped<SelectCustomProps, SelectCustomEvents, SelectCustomSlots> {
}
export {};
