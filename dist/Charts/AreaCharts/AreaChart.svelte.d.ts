import { SvelteComponentTyped } from "svelte";
import type { Margin } from "../types-charts";
declare const __propDef: {
    props: {
        data?: any[];
        xValueId: string;
        margin?: Margin;
        chartTitleSize?: number;
        chartTitleText?: string;
        showTooltip?: boolean;
        formatTooltipXValue?: (value: any) => any;
    };
    events: {
        hoveredData: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export type AreaChartProps = typeof __propDef.props;
export type AreaChartEvents = typeof __propDef.events;
export type AreaChartSlots = typeof __propDef.slots;
export default class AreaChart extends SvelteComponentTyped<AreaChartProps, AreaChartEvents, AreaChartSlots> {
}
export {};
