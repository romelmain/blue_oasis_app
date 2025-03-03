import Menu from './Menu';

export default interface HeaderMenu {
  username: string;
  role: string;
  menu: Array<Menu>;
}
