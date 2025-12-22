import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
// Import ảnh mặc định trực tiếp
import defaultGroupImage from "@/assets/default.jpg"; 

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const { 
    activeConversationId, 
    setActiveConversation, 
    messages, 
    fetchMessages 
  } = useChatStore();

  if (!user) return null;

  const unreadCount = convo.unreadCounts?.[user._id] || 0;
  const name = convo.group?.name ?? "Nhóm";
  const isActive = activeConversationId === convo._id;

  const handleSelectConversation = async () => {
    setActiveConversation(convo._id);
    if (!messages[convo._id]) {
      await fetchMessages();
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <button
            onClick={handleSelectConversation}
            className="relative flex items-center justify-center size-12 group outline-none"
          >
            {/* Thanh chỉ báo bên trái khi đang chọn nhóm */}
            <div className={`absolute -left-2 w-1 bg-primary rounded-r-full transition-all duration-300 
              ${isActive ? "h-8" : "h-0 group-hover:h-4"}`} 
            />

            {/* Container Avatar: Luôn hiện ảnh default.jpg */}
            <div className={`size-11 rounded-full overflow-hidden transition-all duration-200 border-2
              ${isActive ? "rounded-2xl border-primary shadow-md" : "border-transparent group-hover:rounded-2xl"}`}
            >
              <img 
                src={defaultGroupImage} 
                alt={name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thông báo số tin nhắn chưa đọc */}
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex min-w-[20px] h-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white border-2 border-background z-10">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="font-medium">{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default GroupChatCard;