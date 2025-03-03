import Menu from './Menu';

export default interface HeaderMenu {
  userName: string;
  role: string;
  menu: Array<Menu>;
}
