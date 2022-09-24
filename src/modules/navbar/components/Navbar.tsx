import { useNavbarConfig } from "../config/navbar.config";
import { Menubar } from "primereact/menubar";
import { BreadCrumb } from "primereact/breadcrumb";
import { TabMenu } from "primereact/tabmenu";
import gitLogo from "../../../../public/gitlogo.svg";
type Props = {};
const home = { icon: "pi pi-home" };

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
      <Menubar
        model={NAVBAR_CONFIG}
        start={
          <div className="flex-center-all">
            <img alt="logo" src={gitLogo} height="30" className="mr-2"></img>
            <BreadCrumb model={BREADCUMB_CONFIG} home={home} />
          </div>
        }
      />
      <nav className="flex">
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
