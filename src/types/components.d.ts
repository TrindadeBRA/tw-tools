import { ReactNode } from 'react';

// Header Component Props
export interface HeaderProps {
  miniTitle?: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
}

// Breadcrumb Types
export interface BreadcrumbItem {
  name: string;
  href: string;
  current?: boolean;
}

// Info Section Types
export interface InfoItem {
  title: string;
  type: 'info' | 'usage' | 'features' | 'legal';
  content: ReactNode;
}

export interface InfoSectionProps {
  items: InfoItem[];
}

// Form Page Props
export interface FormPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

// Result Client Props
export interface ResultClientProps {
  title: string;
  description: string;
  notFoundTitle: string;
  notFoundDescription: string;
  notFoundMessage: string;
  infoTitle: string;
  infoMessage: string;
  resultLabel: string;
  backPath: string;
  buttonText: string;
  paramName?: string;
  multipleParams?: {
    enabled: boolean;
    params: {
      name: string;
      label: string;
    }[];
  };
}

// Ad Banner Props
export interface AdBannerProps {
  'data-ad-slot': string;
  'data-ad-format': string;
  'data-full-width-responsive': string;
}

// Button Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}