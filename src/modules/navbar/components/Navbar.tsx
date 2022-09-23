import { useNavbarConfig } from "../config/navbar.config";
import { Menubar } from "primereact/menubar";
import { BreadCrumb } from "primereact/breadcrumb";
import { TabMenu } from "primereact/tabmenu";
import gitLogo from "../../../../public/gitlogo.svg";
type Props = {};
const home = { icon: "pi pi-home" };
const start = <img alt="logo" src={gitLogo} height="40" className="mr-2"></img>;
const Navbar = (props: Props) => {
  const {
    NAVBAR_CONFIG,
    BREADCUMB_CONFIG,
    TABMENU_CONFIG,
    activeIndex,
    setActiveIndex,
  } = useNavbarConfig();
  return (
    <>
      <Menubar model={NAVBAR_CONFIG} start={start} />
      <nav className="flex">
        <BreadCrumb model={BREADCUMB_CONFIG} home={home} />
        <TabMenu
          model={TABMENU_CONFIG}
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        />
      </nav>
    </>
  );
};

export default Navbar;
