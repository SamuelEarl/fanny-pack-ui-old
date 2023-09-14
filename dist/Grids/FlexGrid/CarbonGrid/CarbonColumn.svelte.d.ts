/** @typedef {typeof __propDef.props}  CarbonColumnProps */
/** @typedef {typeof __propDef.events}  CarbonColumnEvents */
/** @typedef {typeof __propDef.slots}  CarbonColumnSlots */
export default class CarbonColumn extends SvelteComponentTyped<{
    [x: string]: any;
    padding?: boolean;
    max?: (number | boolean) | {
        span?: number | boolean;
        offset: number;
    };
    sm?: (number | boolean) | {
        span?: number | boolean;
        offset: number;
    };
    md?: (number | boolean) | {
        span?: number | boolean;
        offset: number;
    };
    lg?: (number | boolean) | {
        span?: number | boolean;
        offset: number;
    };
    xlg?: (number | boolean) | {
        span?: number | boolean;
        offset: number;
    };
    as?: boolean;
    noGutter?: boolean;
    noGutterLeft?: boolean;
    noGutterRight?: boolean;
    aspectRatio?: "2x1" | "16x9" | "9x16" | "1x2" | "4x3" | "3x4" | "1x1";
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type CarbonColumnProps = typeof __propDef.props;
export type CarbonColumnEvents = typeof __propDef.events;
export type CarbonColumnSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        padding?: boolean;
        max?: (number | boolean) | {
            span?: number | boolean;
            offset: number;
        };
        sm?: (number | boolean) | {
            span?: number | boolean;
            offset: number;
        };
        md?: (number | boolean) | {
            span?: number | boolean;
            offset: number;
        };
        lg?: (number | boolean) | {
            span?: number | boolean;
            offset: number;
        };
        xlg?: (number | boolean) | {
            span?: number | boolean;
            offset: number;
        };
        as?: boolean;
        noGutter?: boolean;
        noGutterLeft?: boolean;
        noGutterRight?: boolean;
        aspectRatio?: "2x1" | "16x9" | "9x16" | "1x2" | "4x3" | "3x4" | "1x1";
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
