import {
  AIResponseModel,
  ChatSession,
  ChatSessionSummary,
  PopularQuery,
} from "@/interfaces/aiAssistant";
import rateLimitedClient from "./apiClient";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const aiAssistantAPI = {
  getAIResponse: async (
    userId: number,
    question: string,
    session_id: string | null
  ) => {
    const response = await rateLimitedClient.post<AIResponseModel>(
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
    const response = await rateLimitedClient.get<ChatSessionSummary[]>(
      `${API_BASE_URL}/api/AIAssistant/chats`
    );
    return response.data;
  },
  getSessionChats: async (session_id: string) => {
    const response = await rateLimitedClient.get<ChatSession>(
      `${API_BASE_URL}/api/AIAssistant/chats/${session_id}`
    );
    return response.data;
  },
  submitFeedback: async (
    message_id: number,
    vote: "NOTVOTED" | "UPVOTED" | "DOWNVOTED"
  ) => {
    const response = await rateLimitedClient.post(
      `${API_BASE_URL}/api/AIAssistant/feedback`,
      {
        message_id,
        vote,
      }
    );
    return response.data;
  },
  getContextualSuggestion: async (userId: number) => {
    const response = await rateLimitedClient.get<string[]>(
      `${API_BASE_URL}/api/AIAssistant/contextual-suggestions/${userId}`
    );
    return response.data;
  },
  getPopularQueries: async () => {
    const response = await rateLimitedClient.get<PopularQuery[]>(
      `${API_BASE_URL}/api/AIAssistant/popular-queries`
    );
    return response.data;
  },
  deleteSessionById: async (sessionId: string) => {
    const response = await rateLimitedClient.delete(
      `${API_BASE_URL}/api/AIAssistant/chats/${sessionId}`
    );
    return response.data;
  },
  deleteAllSessions: async () => {
    const response = await rateLimitedClient.delete(
      `${API_BASE_URL}/api/AIAssistant/chats`
    );
    return response.data;
  },
  editSessionTitle: async (sessionId: string, newTitle: string) => {
    const response = await rateLimitedClient.put(
      `${API_BASE_URL}/api/AIAssistant/chats/${sessionId}/title`,
      {
        newTitle,
      }
    );
    return response.data;
  },
};
export default aiAssistantAPI;
