import * as React from "react";

import { SearchForm } from "@/components/forms/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RiDashboardLine,
  RiUserLine,
  RiUserStarLine,
  RiLeafLine,
  RiPaypalLine,
  RiSettings3Line,
  RiLogoutBoxLine,
  RiNotificationLine,
  RiBarChartLine,
} from "@remixicon/react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Sections",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: RiDashboardLine,
        },
        {
          title: "Roles",
          url: "#",
          icon: RiUserLine,
        },
        {
          title: "Employees",
          url: "#",
          icon: RiUserStarLine,
          isActive: true,
        },
        {
          title: "Leaves",
          url: "#",
          icon: RiLeafLine,
        },
        {
          title: "Payroll",
          url: "#",
          icon: RiPaypalLine,
        },
        {
          title: "Performance",
          url: "#",
          icon: RiBarChartLine,
        },
        {
          title: "Talent",
          url: "#",
          icon: RiUserStarLine,
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      items: [
        {
          title: "General",
          url: "#",
          icon: RiSettings3Line,
        },
        {
          title: "Notifications",
          url: "#",
          icon: RiNotificationLine,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <TooltipProvider>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">A</span>
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">AnoraHR</span>
                <span className="text-xs text-muted-foreground">
                  HR Platform
                </span>
              </div>
            )}
          </div>
          <hr className="border-t border-border mx-2 -mt-px" />
          {!isCollapsed && <SearchForm className="mt-3" />}
        </SidebarHeader>
        <SidebarContent>
          {/* We create a SidebarGroup for each parent. */}
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              {!isCollapsed && (
                <SidebarGroupLabel className="uppercase text-muted-foreground/60">
                  {item.title}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent className="px-2">
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      {isCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              className="group/menu-button font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                              isActive={item.isActive}
                            >
                              <a href={item.url}>
                                {item.icon && (
                                  <item.icon
                                    className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                                    size={22}
                                    aria-hidden="true"
                                  />
                                )}
                              </a>
                            </SidebarMenuButton>
                          </TooltipTrigger>
                          <TooltipContent side="right" sideOffset={8}>
                            <p>{item.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuButton
                          asChild
                          className="group/menu-button font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto"
                          isActive={item.isActive}
                        >
                          <a href={item.url}>
                            {item.icon && (
                              <item.icon
                                className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                                size={22}
                                aria-hidden="true"
                              />
                            )}
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <hr className="border-t border-border mx-2 -mt-px" />
          <SidebarMenu>
            <SidebarMenuItem>
              {isCollapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
                      <RiLogoutBoxLine
                        className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                        size={22}
                        aria-hidden="true"
                      />
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right" sideOffset={8}>
                    <p>Sign Out</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md bg-gradient-to-r hover:bg-transparent hover:from-sidebar-accent hover:to-sidebar-accent/40 data-[active=true]:from-primary/20 data-[active=true]:to-primary/5 [&>svg]:size-auto">
                  <RiLogoutBoxLine
                    className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary"
                    size={22}
                    aria-hidden="true"
                  />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </TooltipProvider>
  );
}
