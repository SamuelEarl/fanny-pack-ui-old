import { SvelteComponentTyped } from "svelte";
import "./checkbox.css";
declare const __propDef: {
    props: {
        componentId?: string;
        checkboxGroupValues: any;
        valueLabel?: any;
        selectedValues?: any[];
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
export type CheckboxGroupProps = typeof __propDef.props;
export type CheckboxGroupEvents = typeof __propDef.events;
export type CheckboxGroupSlots = typeof __propDef.slots;
export default class CheckboxGroup extends SvelteComponentTyped<CheckboxGroupProps, CheckboxGroupEvents, CheckboxGroupSlots> {
}
export {};
