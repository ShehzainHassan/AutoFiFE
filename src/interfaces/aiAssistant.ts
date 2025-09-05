export interface AIResponseModel {
  answer: string;
  ui_type: string;
  data: string;
  suggested_actions: string[];
  sources: string[];
  session_id: string;
  uiBlock: string;
}
export interface ChatSessionSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id?: number;
  sender: "User" | "AI";
  message: string;
  timestamp: string;
  uiType?: "TEXT" | "TABLE" | "CALCULATOR" | "CARD_GRID" | "CHART";
  queryType?:
    | "GENERAL"
    | "VEHICLE_SEARCH"
    | "AUCTION_QUERY"
    | "FINANCE_CALC"
    | "USER_SPECIFIC";
  suggestedActions?: string[];
  sources?: string[];
  feedback?: number;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  messages: ChatMessage[];
}

export interface PopularQuery {
  text: string;
  count: number;
  last_asked: string;
}

export interface FinanceOpportunity {
  id: number;
  title: string;
  description: string;
}
