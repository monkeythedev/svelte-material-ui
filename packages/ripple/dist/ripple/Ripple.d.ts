export default function Ripple(node: any, props?: any): {
    update(newProps?: {
        ripple: boolean;
        unbounded: boolean;
        color: any;
        classForward: any[];
    }): void;
    destroy(): void;
};
