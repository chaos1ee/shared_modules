import { ReactElement, ReactNode } from 'react';
interface BaseRouteConfig {
    key: string;
    title: string;
    icon?: ReactNode;
    hidden?: boolean;
}
interface NormalRouteConfig extends BaseRouteConfig {
    path: string;
    children?: never;
    element: ReactElement | null;
}
interface SubrouteConfig extends BaseRouteConfig {
    path?: never;
    children: RouteConfig[];
    component?: never;
}
export declare type RouteConfig = NormalRouteConfig | SubrouteConfig;
export default function generateRoute(config: RouteConfig[]): {
    Routes: () => ReactElement<any, string | import("react").JSXElementConstructor<any>> | null;
    Navs: () => JSX.Element;
};
export {};
