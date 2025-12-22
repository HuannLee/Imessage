import { useChatStore } from "@/stores/useChatStore";
import GroupChatCard from "./GroupChatCard";

const GroupChatList = () => {
  const { conversations } = useChatStore();

  if (!conversations) return null;

  // Lọc hội thoại theo type là group (giữ đúng logic của bạn)
  const groupchats = conversations.filter((convo) => convo.type === "group");

  return (
    <div className="flex flex-col items-center w-full space-y-3 py-2">
      {groupchats.map((convo) => (
        <GroupChatCard
          convo={convo}
          key={convo._id}
        />
      ))}
    </div>
  );
};

export default GroupChatList;