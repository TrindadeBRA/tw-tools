declare module '@heroicons/react/20/solid' {
  import { Heroicons } from './global';
  export const ChevronRightIcon: Heroicons.Icon;
  export const ArrowRightIcon: Heroicons.Icon;
  // Add other icons as needed
}

declare module '@heroicons/react/24/outline' {
  import { Heroicons } from './global';
  export const Bars3Icon: Heroicons.Icon;
  export const LightBulbIcon: Heroicons.Icon;
  export const UsersIcon: Heroicons.Icon;
  export const XMarkIcon: Heroicons.Icon;
  export const ArrowsRightLeftIcon: Heroicons.Icon;
  export const ShieldCheckIcon: Heroicons.Icon;
  export const DocumentTextIcon: Heroicons.Icon;
  export const CalculatorIcon: Heroicons.Icon;
  export const DocumentDuplicateIcon: Heroicons.Icon;
  // Add other icons as needed
}

declare module '@headlessui/react' {
  import { HeadlessUI } from './global';
  
  export const Dialog: React.FC<HeadlessUI.DialogProps>;
  export const DialogBackdrop: React.FC<HeadlessUI.TransitionProps>;
  export const DialogPanel: React.FC<HeadlessUI.TransitionProps>;
  export const TransitionChild: React.FC<HeadlessUI.TransitionProps>;
  export const Disclosure: React.FC<HeadlessUI.DisclosureProps>;
  export const DisclosureButton: React.FC<HeadlessUI.DisclosureProps>;
  export const DisclosurePanel: React.FC<HeadlessUI.DisclosureProps>;
}