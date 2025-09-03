import { ChatSessionSummary } from "@/interfaces/aiAssistant";

export interface ConversationListProps {
  sessions: ChatSessionSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
}
