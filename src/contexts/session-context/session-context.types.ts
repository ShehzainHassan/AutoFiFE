import { ChatMessage, ChatSessionSummary } from "@/interfaces/aiAssistant";

export interface SessionContextType {
  selectedSessionId: string | null;
  setSelectedSessionId: (id: string | null) => void;
  sessionTitles: ChatSessionSummary[] | undefined;
  isSessionLoading: boolean;
  messages: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  handleNewMessage: (msg: ChatMessage, replaceLast?: boolean) => void;
  handleNewChat: () => void;
}
