import { useFriendStore } from "@/stores/useFriendStore";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { MessageSquarePlus, UserPlus } from "lucide-react"; // Hoặc MessageSquarePlus tùy bạn chọn
import FriendListModal from "../createNewChat/FriendListModal";
import { Button } from "../ui/button"; // Nên dùng component Button của shadcn/ui nếu có

const CreateNewChat = () => {
  const { getFriends } = useFriendStore();

  const handleOpenModal = async () => {
    // Gọi API lấy danh sách bạn bè khi người dùng nhấn vào nút
    await getFriends();
  };

  return (
    <div className="flex items-center justify-center">
      <Dialog onOpenChange={(open) => open && handleOpenModal()}>
        <DialogTrigger asChild>
          {/* Nút tròn với icon dấu cộng */}
          <Button 
            className="flex items-center justify-center size-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md active:scale-95"
            title="Gửi tin nhắn mới"
          >
            <MessageSquarePlus className="size-5" />
            <span className="sr-only">Gửi tin nhắn mới</span>
          </Button>
        </DialogTrigger>

        <FriendListModal />
      </Dialog>
    </div>
  );
};

export default CreateNewChat;