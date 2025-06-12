import { ComponentType, ReactNode } from 'react';
import { IconProps } from '@heroicons/react/24/outline';

declare global {
  // Extend Window interface
  interface Window {
    gtag: (...args: any[]) => void;
  }

  // Extend React namespace
  namespace React {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
      'aria-hidden'?: boolean;
    }
  }

  // Icon component type
  type IconComponent = ComponentType<IconProps>;

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
  }

  // Next.js Link props
  interface LinkProps extends BaseProps {
    href: string;
    prefetch?: boolean;
    replace?: boolean;
    scroll?: boolean;
    shallow?: boolean;
  }

  // Headless UI props
  interface HeadlessProps extends BaseProps {
    as?: ElementType;
    static?: boolean;
    unmount?: boolean;
  }

  // Script props
  interface ScriptProps extends BaseProps {
    id: string;
    src?: string;
    strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
    onLoad?: () => void;
    onError?: () => void;
    dangerouslySetInnerHTML?: {
      __html: string;
    };
  }
}