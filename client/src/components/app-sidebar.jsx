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
} from "@/components/ui/sidebar"

import { MessageSquareText,Flame ,UserPlus ,NotebookPen , ListVideo,Wallet  ,Settings, ChevronDown, UserRound, LogOut, Settings2 } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "./ui/dropdown-menu"
import Image from "next/image"
import { useAdmin } from "@/app/contexapi"

const items = [
  {
    title: "Chats",
    url: "./chats",
    icon: MessageSquareText,
  },
  {
    title: "Maneage courses",
    url: "./courses",
    icon: ListVideo,
  },
  {
    title: "Members",
    url: "./members",
    icon: Flame,
  },
  {
    title: "Payments",
    url: "./payments",
    icon: Wallet ,
  },
  {
    title: "User request",
    url: "./requests",
    icon: UserPlus ,
  },
  {
    title: "Maneage Plans",
    url: "./maneage_plans",
    icon: NotebookPen,
  },
]

export function AppSidebar() {
  const admin = useAdmin()
  return (
    <Sidebar collapsible>
      {/* side bar header */}
      <SidebarHeader>
        <SidebarMenu>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex justify-between outline-none">
                <div className="flex gap-2">
                  <Image
                    src="/accets/AClogo.png"
                    width={100}
                    height={100}
                    quality={100}
                    alt="avtar"
                    className="w-8 h-8 my-auto"
                  />
                  <h1 className="my-auto font-medium">profile</h1>
                </div>
                <ChevronDown className="my-auto " />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px]">
              {/* menu */}
              <div className="w-full py-1">
                <div className="flex flex-col my-1">
                  <Image
                    src="/accets/AClogo.png"
                    width={100}
                    height={100}
                    quality={100}
                    alt="avtar"
                    className="mx-auto w-7 h-7 my-auto"
                  />
                  <h1 className="mx-auto">{admin?.email}</h1>
                </div>
                <hr />
                <SidebarMenu className="mt-2">
                  <SidebarMenuItem className="w-full hover:bg-gray-100 hover:rounded-lg p-1 flex">
                    <div className="flex gap-2">
                      <UserRound className="my-auto w-5 h-5" />
                      <Link className="my-auto " href={"#"}>Profile</Link>
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="w-full hover:bg-gray-100 hover:rounded-lg p-1 flex">
                    <div className="flex gap-2">
                      <Settings2 className="my-auto w-5 h-5" />
                      <Link className="my-auto " href={"#"}>Setting</Link>
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem className="w-full hover:bg-gray-100 hover:rounded-lg p-1 flex">
                    <div className="flex gap-2">
                      <LogOut className="my-auto w-5 h-5" />
                      <Link className="my-auto " href={"#"}>Logout</Link>
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
      </SidebarHeader>
      <hr />
      {/* sidebar header */}
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel className="mx-2 text-lg">Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu className="px-5">
            {
              items.map((item, index) => (
                <SidebarMenuItem key={index} className="w-full hover:bg-gray-200 hover:rounded-lg p-1 flex">

                  <item.icon className=" my-auto" />
                  <Link href={item.url} className="font-semibold my-auto p-2">{item.title}</Link>

                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
