import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        label?: string;
        options: any;
        optionValue?: any;
        optionLabel?: any;
        optgroup?: any;
        value: any;
    };
    events: {
        change: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SelectAttemptProps = typeof __propDef.props;
export type SelectAttemptEvents = typeof __propDef.events;
export type SelectAttemptSlots = typeof __propDef.slots;
export default class SelectAttempt extends SvelteComponentTyped<SelectAttemptProps, SelectAttemptEvents, SelectAttemptSlots> {
}
export {};
