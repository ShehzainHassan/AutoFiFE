import { ChatSessionSummary } from "@/interfaces/aiAssistant";

export interface SidebarProps {
  sessionTitles?: ChatSessionSummary[];
  isLoading: boolean;
  onSessionSelect: (id: string) => void;
  onNewChat?: () => void;
  selectedSessionId: string | null;
}
