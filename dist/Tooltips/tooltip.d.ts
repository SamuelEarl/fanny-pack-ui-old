import "tippy.js/dist/tippy.css";
export default function tooltip(node: any, params?: {}): {
    update: (newParams: any) => any;
    destroy: () => any;
};
