import { useAuth } from "@/contexts/auth-context";
import { useSession } from "@/contexts/session-context";
import useDeleteAllSessions from "@/hooks/useDeleteAllSessions";
import useDeleteSessionById from "@/hooks/useDeleteSessionById";
import useEditSessionTitle from "@/hooks/useEditSessionTitle";
import { ChatSessionSummary } from "@/interfaces/aiAssistant";
import { useCallback, useMemo, useState } from "react";

export type ModalType = "edit" | "delete" | "clearAll" | null;

export default function useSidebarLogic(
  sessionTitles?: ChatSessionSummary[] | null
) {
  const { selectedSessionId, setMessages, setSelectedSessionId } = useSession();
  const { userId } = useAuth();
  const [modalType, setModalType] = useState<ModalType>(null);
  const [currentTitle, setCurrentTitle] = useState("");
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const deleteSessionMutation = useDeleteSessionById();
  const deleteAllSessionsMutation = useDeleteAllSessions();
  const editSessionMutation = useEditSessionTitle();

  const now = useMemo(() => new Date(), []);
  const sevenDaysAgo = useMemo(
    () => new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    [now]
  );

  const sessions = useMemo(
    () => (sessionTitles ?? []).slice(),
    [sessionTitles]
  );

  const recentSessions = useMemo(
    () =>
      sessions.filter((s) => {
        const updated = new Date(s.updatedAt);
        return updated > sevenDaysAgo;
      }),
    [sessions, sevenDaysAgo]
  );

  const olderSessions = useMemo(
    () =>
      sessions.filter((s) => {
        const updated = new Date(s.updatedAt);
        return updated <= sevenDaysAgo;
      }),
    [sessions, sevenDaysAgo]
  );

  const openEditModal = useCallback(
    (sessionId: string, title: string) => {
      setSelectedSessionId(sessionId);
      setCurrentTitle(title);
      setModalType("edit");
    },
    [setSelectedSessionId]
  );

  const openDeleteModal = useCallback((sessionId: string) => {
    setSessionToDelete(sessionId);
    setModalType("delete");
  }, []);

  const openClearAllModal = useCallback(() => {
    setModalType("clearAll");
  }, []);

  const closeModal = useCallback(() => {
    setModalType(null);
    setSessionToDelete(null);
    setSelectedSessionId(selectedSessionId);
    setCurrentTitle("");
  }, [setSelectedSessionId, selectedSessionId]);

  const handleUpdateTitle = useCallback(() => {
    if (!selectedSessionId || !currentTitle.trim()) return;
    editSessionMutation.mutate(
      { sessionId: selectedSessionId, newTitle: currentTitle.trim() },
      {
        onSuccess: () => {
          closeModal();
          setSelectedSessionId(selectedSessionId);
        },
      }
    );
  }, [
    selectedSessionId,
    currentTitle,
    editSessionMutation,
    setSelectedSessionId,
    closeModal,
  ]);

  const handleDeleteSession = useCallback(() => {
    if (!sessionToDelete) return;

    deleteSessionMutation.mutate(
      { sessionId: sessionToDelete, userId },
      {
        onSuccess: () => {
          setModalType(null);
          setSessionToDelete(null);

          if (selectedSessionId === sessionToDelete) {
            setSelectedSessionId(null);
            setMessages([]);
          }
        },
      }
    );
  }, [
    userId,
    sessionToDelete,
    deleteSessionMutation,
    selectedSessionId,
    setSelectedSessionId,
    setMessages,
  ]);

  const handleDeleteAll = useCallback(() => {
    deleteAllSessionsMutation.mutate();
    setModalType(null);
    setSelectedSessionId(null);
  }, [deleteAllSessionsMutation, setSelectedSessionId]);

  const selectSession = useCallback(
    (sessionId: string, onSessionSelect?: (id: string) => void) => {
      setSelectedSessionId(sessionId);
      if (onSessionSelect) onSessionSelect(sessionId);
    },
    [setSelectedSessionId]
  );

  return {
    modalType,
    currentTitle,
    setCurrentTitle,
    sessionToDelete,
    recentSessions,
    olderSessions,

    deleteSessionPending: deleteSessionMutation.isPending,
    deleteAllPending: deleteAllSessionsMutation.isPending,
    editSessionPending: editSessionMutation.isPending,

    openEditModal,
    openDeleteModal,
    openClearAllModal,
    closeModal,
    handleUpdateTitle,
    handleDeleteSession,
    handleDeleteAll,
    selectSession,
  };
}
