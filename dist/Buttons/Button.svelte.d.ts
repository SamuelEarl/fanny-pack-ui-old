import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        type?: string;
        bgColor?: string;
        borderColor?: string;
        textColor?: string;
        padding?: string;
        fontSize?: string;
        width?: string;
        disabled?: boolean;
        formIsInvalid?: boolean;
        btnIcon?: string;
        btnIconDisabled?: string;
        btnIconSide?: string;
        btnIconDisabledShouldSpin?: boolean;
        rotateBtnIcon?: string;
        rotateBtnIconDisabled?: string;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        btnTextDisabled: {};
        default: {};
    };
};
export type ButtonProps = typeof __propDef.props;
export type ButtonEvents = typeof __propDef.events;
export type ButtonSlots = typeof __propDef.slots;
export default class Button extends SvelteComponentTyped<ButtonProps, ButtonEvents, ButtonSlots> {
}
export {};
