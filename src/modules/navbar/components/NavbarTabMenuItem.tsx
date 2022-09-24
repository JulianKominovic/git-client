import React from "react";

type Props = {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  icon: JSX.Element;
  tabName: string;
  index: number;
  onClick: () => void;
};

const NavbarTabMenuItem = ({
  setActiveIndex,
  icon,
  tabName,
  index,
  onClick,
}: Props) => {
  return (
    <a
      href="#"
      className="p-menuitem-link"
      role="presentation"
      onClick={() => {
        setActiveIndex(index);
        onClick();
      }}
    >
      <span className="p-menuitem-icon pi pi-fw">{icon}</span>
      <span className="p-menuitem-text">{tabName}</span>
    </a>
  );
};

export default NavbarTabMenuItem;
