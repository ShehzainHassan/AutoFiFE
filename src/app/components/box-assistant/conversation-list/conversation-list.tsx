"use client";
import ConversationItem from "../conversation-item/conversation-item";
import { ConversationListProps } from "./conversation-list.types";
import classes from "./conversation-list.module.css";

export default function ConversationList({
  sessions,
  selectedId,
  onSelect,
  onDelete,
  onEdit,
}: ConversationListProps) {
  return (
    <div className={classes.conversationContainer}>
      {sessions.map((session) => (
        <ConversationItem
          key={session.id}
          id={session.id}
          title={session.title}
          isSelected={selectedId === session.id}
          onSelect={onSelect}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
