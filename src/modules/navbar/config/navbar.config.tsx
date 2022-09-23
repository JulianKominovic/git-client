import { open } from "@tauri-apps/api/dialog";
import React, { useState } from "react";
import useCWD from "../../../actions/currentWorkingDirectory";
import FeatherIcon from "feather-icons-react";

export const useNavbarConfig = () => {
  const { cwd, setCWD } = useCWD((state) => state);
  const [activeIndex, setActiveIndex] = useState(0);

  const NAVBAR_CONFIG = [
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
        {
          label: "Delete",
          icon: "pi pi-fw pi-trash",
        },
        {
          separator: true,
        },
        {
          label: "Export",
          icon: "pi pi-fw pi-external-link",
        },
      ],
    },
    {
      label: "Edit",
      icon: "pi pi-fw pi-pencil",
      items: [
        {
          label: "Left",
          icon: "pi pi-fw pi-align-left",
        },
        {
          label: "Right",
          icon: "pi pi-fw pi-align-right",
        },
        {
          label: "Center",
          icon: "pi pi-fw pi-align-center",
        },
        {
          label: "Justify",
          icon: "pi pi-fw pi-align-justify",
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
    ? cwd
        .split("/")
        .map((folder) => {
          const section = folder.replace("/", "");
          return { label: section };
        })
        .filter((section) => section.label)
    : [{ label: "Elegí un directorio" }];
  const TABMENU_CONFIG = [
    { label: "Git tree", icon: "pi pi-fw pi-home" },
    {
      label: "Branches",
      template: () => {
        return (
          <a
            href="#"
            className="p-menuitem-link"
            role="presentation"
            onClick={() => setActiveIndex(1)}
          >
            <span className="p-menuitem-icon pi pi-fw ">
              <FeatherIcon icon="git-branch" />
            </span>
            <span className="p-menuitem-text">Branches</span>
          </a>
        );
      },
    },
    { label: "Commits", icon: "pi pi-fw pi-pencil" },
    { label: "Tags", icon: "pi pi-fw pi-tags" },
    { label: "Misc", icon: "pi pi-fw pi-cog" },
  ];
  return {
    NAVBAR_CONFIG,
    BREADCUMB_CONFIG,
    TABMENU_CONFIG,
    activeIndex,
    setActiveIndex,
  };
};
