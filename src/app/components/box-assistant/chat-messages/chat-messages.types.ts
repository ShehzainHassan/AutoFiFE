import { ChatMessage } from "@/interfaces/aiAssistant";

export interface ChatMessagesProps {
  messages: ChatMessage[];
  isPending?: boolean;
}
