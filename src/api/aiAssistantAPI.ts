import {
  AIResponseModel,
  ChatSession,
  ChatSessionSummary,
} from "@/interfaces/aiAssistant";
import apiClient from "./apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const aiAssistantAPI = {
  getAIResponse: async (
    userId: number,
    question: string,
    session_id: string | null
  ) => {
    const response = await apiClient.post<AIResponseModel>(
      `${API_BASE_URL}/api/AIAssistant/query`,
      {
        session_id: session_id,
        user_id: userId,
        query: {
          question: question,
        },
      }
    );
    return response.data;
  },
  getUserSessionTitles: async () => {
    const response = await apiClient.get<ChatSessionSummary[]>(
      `${API_BASE_URL}/api/AIAssistant/chats`
    );
    return response.data;
  },
  getSessionChats: async (session_id: string) => {
    const response = await apiClient.get<ChatSession>(
      `${API_BASE_URL}/api/AIAssistant/chats/${session_id}`
    );
    return response.data;
  },
  submitFeedback: async (
    message_id: number,
    vote: "NOTVOTED" | "UPVOTED" | "DOWNVOTED"
  ) => {
    const response = await apiClient.post(
      `${API_BASE_URL}/api/AIAssistant/feedback`,
      {
        message_id,
        vote,
      }
    );
    return response.data;
  },
  getContextualSuggestion: async (userId: number) => {
    const response = await apiClient.get(
      `${API_BASE_URL}/api/AIAssistant/contextual-suggestions/${userId}`
    );
    return response.data;
  },
};
export default aiAssistantAPI;
