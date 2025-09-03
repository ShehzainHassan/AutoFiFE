"use client";
import React from "react";
import Image from "next/image";
import MessageIcon from "@/assets/images/icons/message.svg";
import EditIcon from "@/assets/images/icons/edit.svg";
import DeleteIcon from "@/assets/images/icons/trash.svg";
import classes from "./conversation-item.module.css";
import { ConversationItemProps } from "./conversation-item.types";

export default function ConversationItem({
  id,
  title,
  isSelected,
  onSelect,
  onDelete,
  onEdit,
}: ConversationItemProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      className={`${classes.recentConversations} ${
        isSelected ? classes.selected : ""
      }`}
      onClick={() => onSelect(id)}>
      <div className={classes.recentConversationInfo}>
        <Image src={MessageIcon} alt="" width={16} height={16} />
        <p className={classes.truncateTitle}>{title}</p>
      </div>

      <div className={classes.modifyContainer}>
        {isSelected && (
          <div className={classes.modify}>
            <div
              className={classes.iconButton}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}>
              <Image src={DeleteIcon} alt="delete" width={16} height={16} />
            </div>
            <div
              className={classes.iconButton}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id, title);
              }}>
              <Image src={EditIcon} alt="edit" width={16} height={16} />
            </div>
          </div>
        )}
        <div className={classes.rounded} />
      </div>
    </div>
  );
}
