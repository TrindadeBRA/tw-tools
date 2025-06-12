/// <reference types="react" />
/// <reference types="react-dom" />

import { ComponentType, ElementType, ReactNode } from 'react';

declare global {
  // Extend Window interface
  interface Window {
    gtag: (...args: any[]) => void;
  }

  // Heroicons types
  namespace Heroicons {
    interface IconProps {
      className?: string;
      'aria-hidden'?: boolean;
      size?: number | string;
    }

    type Icon = ComponentType<IconProps>;
  }

  // Headless UI types
  namespace HeadlessUI {
    interface TransitionProps {
      as?: ElementType;
      show?: boolean;
      appear?: boolean;
      unmount?: boolean;
      className?: string | ((bag: { open: boolean }) => string);
      children?: ReactNode | ((bag: { open: boolean }) => ReactNode);
    }

    interface DialogProps {
      as?: ElementType;
      static?: boolean;
      unmount?: boolean;
      open: boolean;
      onClose: (value: boolean) => void;
      className?: string;
      children?: ReactNode;
    }

    interface DisclosureProps {
      as?: ElementType;
      defaultOpen?: boolean;
      className?: string;
      children?: ReactNode | ((bag: { open: boolean }) => ReactNode);
    }
  }

  // Common props
  interface BaseProps {
    children?: ReactNode;
    className?: string;
  }

  // Next.js Image props
  interface ImageProps extends BaseProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
    loading?: 'lazy' | 'eager';
    quality?: number;
    placeholder?: 'blur' | 'empty';
    style?: React.CSSProperties;
    sizes?: string;
    fill?: boolean;
  }

  // Next.js Link props
  interface LinkProps extends BaseProps {
    href: string;
    prefetch?: boolean;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
  }

  // Script props
  interface ScriptProps extends BaseProps {
    id: string;
    src?: string;
    strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload' | 'worker';
    onLoad?: () => void;
    onError?: () => void;
    onReady?: () => void;
    dangerouslySetInnerHTML?: {
      __html: string;
    };
  }

  // Extend JSX namespace
  namespace JSX {
    interface IntrinsicElements {
      'next-route-announcer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}