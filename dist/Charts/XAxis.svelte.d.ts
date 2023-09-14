import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        showAxisLine?: boolean;
        lineStrokeColor?: string;
        lineStrokeWidth?: number;
        showTickMarks?: boolean;
        fullLengthTickMarks?: boolean;
        numberOfTickMarks?: number;
        showTickLabels?: boolean;
        tickLabelFontSize?: number;
        tickLabelFill?: string;
        formatTickLabel?: (tick: any) => any;
        tickLabelTranslateX?: number;
        tickLabelTranslateY?: number;
        rotateTickLabel?: number;
        axisLabelText?: string;
        axisLabelSize?: number;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type XAxisProps = typeof __propDef.props;
export type XAxisEvents = typeof __propDef.events;
export type XAxisSlots = typeof __propDef.slots;
export default class XAxis extends SvelteComponentTyped<XAxisProps, XAxisEvents, XAxisSlots> {
}
export {};
