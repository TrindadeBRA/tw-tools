import { ComponentType } from 'react';

export interface SubNavItem {
    name: string;
    href: string;
    description?: string;
    current?: boolean;
    shortcutHidden?: boolean;
}

export interface NavItem {
    name: string;
    href?: string;
    icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
    current: boolean;
    children?: SubNavItem[];
    description?: string;
}

export interface RouteGroup {
    name: string;
    icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
    current: boolean;
    children: SubNavItem[];
}