import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";
// 1. Import ảnh default
import defaultGroupImage from "@/assets/default.jpg"; 

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset className="flex w-full h-full bg-transparent">
      <ChatWindowHeader />
      <div className="flex bg-primary-foreground rounded-2xl flex-1 items-center justify-center">
        <div className="text-center">
          {/* 2. Thay thế icon bằng Container chứa ảnh */}
          <div className="size-24 mx-auto mb-6 bg-gradient-chat rounded-full p-1 flex items-center justify-center shadow-glow overflow-hidden">
             <div className="size-full rounded-full overflow-hidden bg-white">
                <img 
                  src={defaultGroupImage} 
                  alt="Default" 
                  className="w-full h-full object-cover"
                />
             </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-2 bg-gradient-chat bg-clip-text text-transparent">
            Chào mừng bạn đến với Imessage!
          </h2>
          <p className="text-muted-foreground">
            Chọn một cuộc hội thoại để bắt đầu chat!
          </p>
        </div>
      </div>
    </SidebarInset>
  );
};

export default ChatWelcomeScreen;