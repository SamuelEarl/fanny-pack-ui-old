import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        axisType?: string;
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
export type AxisProps = typeof __propDef.props;
export type AxisEvents = typeof __propDef.events;
export type AxisSlots = typeof __propDef.slots;
export default class Axis extends SvelteComponentTyped<AxisProps, AxisEvents, AxisSlots> {
}
export {};
