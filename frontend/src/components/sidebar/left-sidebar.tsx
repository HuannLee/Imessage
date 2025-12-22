import { MessageCircle, Users, Inbox, Plus, UserPlus } from "lucide-react";
import NewGroupChatModal from "../chat/NewGroupChatModal";
import GroupChatList from "../chat/GroupChatList";

export function LeftSidebar() {
  return (
    <div className="flex h-full w-16 flex-col items-center bg-muted/50 py-3">
      {/* ===== PART 1: TOP ICONS ===== */}
      <div className="flex flex-col items-center gap-3">
        <IconButton icon={<MessageCircle />} />
        <IconButton icon={<Users />} />
        <IconButton icon={<Inbox />} />

      </div>

      {/* Divider */}
      <div className="my-4 h-px w-8 bg-border" />

      {/* ===== PART 2: GROUP AVATAR LIST ===== */}
      <div className="flex flex-1 flex-col items-center gap-3 overflow-y-auto">
        <GroupChatList  />
        <NewGroupChatModal/>
          
      </div>
    </div>
  );
}

function IconButton({
  icon,
  danger = false,
}: {
  icon: React.ReactNode;
  danger?: boolean;
}) {
  return (
    <button
      className={`flex h-10 w-10 items-center justify-center rounded-full
        ${danger ? "bg-red-500 text-white" : "bg-background hover:bg-accent"}
        transition`}
    >
      {icon}
    </button>
  );
}
