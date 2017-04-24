declare module 'mdl-react' {
    import React = __React;

    type __MDLClassProps = React.ClassAttributes<any>;
    type __MDLOtherProps = React.HTMLProps<any>;

    type __CellAlign = 'top' | 'middle' | 'bottom' | 'stretch';
    type __MenuAlign = 'left' | 'right';
    type __MenuValign = 'bottom' | 'top';

    interface ShadowedComponent {
        shadow?: number;
    }
    interface RippleComponent {
        ripple?: boolean;
    }
    interface CustomRenderedComponent {
        component?: string | JSX.Element | Function;
    }

    interface ElementProps extends React.Props<any> {
        className?: string;
        text?: string;
        id?: string;
        name?: string;
        disabled?: boolean;
        style?: any;
        onClick?: any;
    }

    interface FieldProps extends ElementProps {
        label: string;
        format?: string;
        placeholder?: string;
        readOnly?: boolean;
        value?: any;
        required?: boolean;
        onChange?: any;
    }

    interface ButtonProps extends ElementProps {
        accent?: boolean;
        colored?: boolean;
        component?: any;
        href?: string;
        primary?: boolean;
        raised?: boolean;
        ripple?: boolean;
        mini?: boolean;
        target?: string;
    }

    export interface GridProps extends __MDLOtherProps, CustomRenderedComponent, ShadowedComponent {
        noSpacing?: boolean;
    }

    export interface CellProps extends __MDLOtherProps, CustomRenderedComponent, ShadowedComponent {
        col: number;
        align?: __CellAlign;
        phone?: number;
        tablet?: number;
        hideDesktop?: boolean;
        hidePhone?: boolean;
        hideTablet?: boolean;
    }

    export interface MenuProps extends ElementProps, RippleComponent {
        target: string;
        align?: __MenuAlign;
        valign?: __MenuValign;
        ripple?: boolean;
    }

    interface BadgeProps extends React.Props<any> {
        className?: string;
        text?: string | number;
        overlap?: boolean;
        noBackground?: boolean;
    }

    interface ObjectConstructor {
        assign(target: any, ...sources: any[]): any;
    }
}