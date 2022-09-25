import { open } from "@tauri-apps/api/dialog";
import React, { useState } from "react";
import useCWD from "../../../actions/currentWorkingDirectory";
import FeatherIcon from "feather-icons-react";
import NavbarTabMenuItem from "../components/NavbarTabMenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import { MenuItem, MenuItemTemplateType } from "primereact/menuitem";
import { BiGitBranch, BiPlusCircle } from "react-icons/bi";
import useCurrentStatus from "../../../actions/currentStatus";
import { Tag } from "primereact/tag";

const ROUTES = {
  HOME: "/",
  BRANCHES: "/branches",
  COMMITS: "/commits",
  TAGS: "/tags",
  CONFIG: "/config",
};

export const useNavbarConfig = () => {
  const { cwd, setCWD } = useCWD((state) => state);
  const currentBranch = useCurrentStatus((state) => state.currentBranch);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(() =>
    Object.values(ROUTES).findIndex((route) => route === location.pathname)
  );

  const NAVBAR_CONFIG: MenuItem[] = [
    {
      label: "File",
      icon: "pi pi-fw pi-file",
      items: [
        {
          label: "Open",
          icon: "pi pi-fw pi-plus",
          command: async () => {
            const selected = await open({
              directory: true,
            });

            if (!selected) return;
            setCWD(selected as string);
            localStorage.setItem(
              "info",
              JSON.stringify({
                cwd: selected,
                limit: "30",
              })
            );
          },
        },
      ],
    },
    {
      label: "Branch",
      icon: "pi pi-fw pi-pencil",
      template: (item, options) => (
        <a
          href="#"
          role="menuitem"
          className="p-menuitem-link"
          aria-haspopup="true"
          onClick={options.onClick}
        >
          <BiGitBranch />
          <span className="p-menuitem-text">Branches</span>
          <span className="p-submenu-icon pi pi-angle-down"></span>
        </a>
      ),
      items: [
        {
          label: "Left",

          template: () => (
            <a
              href="#"
              role="menuitem"
              className="p-menuitem-link"
              aria-haspopup="false"
            >
              <BiPlusCircle className="mr-2" />
              <span className="p-menuitem-text">Nueva branch</span>
            </a>
          ),
        },
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "New",
          icon: "pi pi-fw pi-user-plus",
        },
        {
          label: "Delete",
          icon: "pi pi-fw pi-user-minus",
        },
        {
          label: "Search",
          icon: "pi pi-fw pi-users",
          items: [
            {
              label: "Filter",
              icon: "pi pi-fw pi-filter",
              items: [
                {
                  label: "Print",
                  icon: "pi pi-fw pi-print",
                },
              ],
            },
            {
              icon: "pi pi-fw pi-bars",
              label: "List",
            },
          ],
        },
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        {
          label: "Edit",
          icon: "pi pi-fw pi-pencil",
          items: [
            {
              label: "Save",
              icon: "pi pi-fw pi-calendar-plus",
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
        {
          label: "Archieve",
          icon: "pi pi-fw pi-calendar-times",
          items: [
            {
              label: "Remove",
              icon: "pi pi-fw pi-calendar-minus",
            },
          ],
        },
      ],
    },

    {
      label: "Quit",
      icon: "pi pi-fw pi-power-off",
    },
  ];

  const BREADCUMB_CONFIG = cwd
    ? [
        ...cwd
          .split("/")
          .map((folder) => {
            const section = folder.replace("/", "");
            return { label: section };
          })
          .filter((section) => section.label),
        {
          template: () => (
            <>
              <Tag severity="info" icon={<BiGitBranch />}>
                {currentBranch}
              </Tag>
            </>
          ),
        },
      ]
    : [{ label: "Elegí un directorio" }];
  const TABMENU_CONFIG = [
    {
      label: "Git tree",
      icon: "pi pi-fw pi-home",
      command: () => navigate(ROUTES.HOME),
    },
    {
      label: "Branches",
      template: () => {
        return (
          <NavbarTabMenuItem
            icon={<FeatherIcon icon="git-branch" />}
            tabName="Branches"
            index={1}
            setActiveIndex={setActiveIndex}
            onClick={() => navigate(ROUTES.BRANCHES)}
          />
        );
      },
    },
    {
      label: "Commits",
      template: () => {
        return (
          <NavbarTabMenuItem
            icon={<FeatherIcon icon="git-commit" />}
            tabName="Commits"
            index={2}
            setActiveIndex={setActiveIndex}
            onClick={() => navigate(ROUTES.COMMITS)}
          />
        );
      },
    },
    {
      label: "Tags",
      icon: "pi pi-fw pi-tags",
      command: () => navigate(ROUTES.TAGS),
    },
    {
      label: "Misc",
      icon: "pi pi-fw pi-cog",
      command: () => navigate(ROUTES.CONFIG),
    },
  ];
  return {
    NAVBAR_CONFIG,
    BREADCUMB_CONFIG,
    TABMENU_CONFIG,
    activeIndex,
    setActiveIndex,
  };
};
