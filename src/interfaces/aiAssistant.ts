export interface AIResponseModel {
  answer: string;
  ui_type: string;
  data: any;
  suggested_actions: string[];
  sources: string[];
  session_id: string;
}
export interface ChatSessionSummary {
  id: string;
  title: string;
  created_at: string;
}

export interface ChatMessage {
  id?: number;
  sender: "User" | "AI";
  message: string;
  timestamp: string;
  ui_type?: "TEXT" | "TABLE" | "CALCULATOR" | "CARD_GRID" | "CHART";
  query_type?:
    | "GENERAL"
    | "VEHICLE_SEARCH"
    | "AUCTION_QUERY"
    | "FINANCE_CALC"
    | "USER_SPECIFIC";
  suggested_actions?: string[];
  sources?: string[];
  feedback?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
}
