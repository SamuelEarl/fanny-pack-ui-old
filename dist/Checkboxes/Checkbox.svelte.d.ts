import { SvelteComponentTyped } from "svelte";
import "./checkbox.css";
declare const __propDef: {
    props: {
        id: any;
        checked: any;
        label: any;
        disabled?: boolean;
        marginBottom?: string;
        verticalAlignment?: string;
    };
    events: {
        change: Event;
        input: Event;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type CheckboxProps = typeof __propDef.props;
export type CheckboxEvents = typeof __propDef.events;
export type CheckboxSlots = typeof __propDef.slots;
export default class Checkbox extends SvelteComponentTyped<CheckboxProps, CheckboxEvents, CheckboxSlots> {
}
export {};
