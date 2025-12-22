import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { LeftSidebar } from "./left-sidebar";
import DirectMessageList from "../chat/DirectMessageList";
import { useAuthStore } from "@/stores/useAuthStore";
import AddFriendModal from "../chat/AddFriendModal";
import CreateNewChat from "../chat/CreateNewChat";

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuthStore();

  return (
    <Sidebar variant="inset" {...props}>
      <div className="flex h-full overflow-hidden"> 
        {/* ===== LEFT ICON BAR ===== */}
        <LeftSidebar />

        {/* ===== MAIN SIDEBAR ===== */}
        <div className="flex flex-1 flex-col min-w-0">
          
        
          <SidebarHeader className="border-b shrink-0"> 
            <div className="flex items-center justify-between px-4 py-4">
              <h2 className="font-bold text-xl tracking-tight whitespace-nowrap">
                Đoạn chat
              </h2>
              
              <div className="flex items-center gap-2 shrink-0">
                <AddFriendModal />
                <CreateNewChat />
              </div>
            </div>
          </SidebarHeader>

          {/* Phần nội dung list chat */}
          <SidebarContent className="flex-1 overflow-y-auto beautiful-scrollbar">
            <DirectMessageList />
          </SidebarContent>

          <SidebarFooter className="shrink-0 border-t">
            {user && <NavUser user={user} />}
          </SidebarFooter>
        </div>
      </div>
    </Sidebar>
  );
}
