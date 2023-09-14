import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        showAxisLine?: boolean;
        showTickMarks?: boolean;
        fullLengthTickMarks?: boolean;
        numberOfTickMarks?: number;
        showTickLabels?: boolean;
        formatTickLabel?: (tick: any) => any;
        tickLabelTranslateX?: number;
        tickLabelTranslateY?: number;
        rotateTickLabel?: number;
        axisLabelText?: string;
        axisLabelSize?: number;
        lineStrokeColor?: string;
        lineStrokeWidth?: number;
        tickLabelFontSize?: number;
        tickLabelFill?: string;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type YAxisProps = typeof __propDef.props;
export type YAxisEvents = typeof __propDef.events;
export type YAxisSlots = typeof __propDef.slots;
export default class YAxis extends SvelteComponentTyped<YAxisProps, YAxisEvents, YAxisSlots> {
}
export {};
