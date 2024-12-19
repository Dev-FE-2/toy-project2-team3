export type NavItem = {
  text: string;
  link: string;
  name: string;
  icon: string;
  iconSize?: number;
  hasSubNav: boolean;
  firstSubNav: string;
  isSubNav: boolean;
  parentNav: string;
};
