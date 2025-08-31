import { ChatMessage } from "@/interfaces/aiAssistant";

export interface InputQueryProps {
  sessionId: string | null;
  onNewMessage: (msg: ChatMessage, replaceLast?: boolean) => void;
  messageCount: number;
}
