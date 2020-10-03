// Package
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

// Utilities
import { convertToStringId } from "../utilities/convert-to-string-id.utility";

// Styles
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./card-item.style.css";

import BoardContext from "../BoardContext";

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#C53030" : "#FFF5F5",

  // styles we need to apply on draggables
  ...draggableStyle,
});


const CardItem = props => {
  const [isEditingTask, setEditingTask] = useState(false);
  const { item, index } = props;

  const _handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setEditingTask(false);
    }

    if (event.key === "Enter") {
      // Implement way to edit task
      console.warn('Implement way to edit task')
    }
  };

  return (
    <BoardContext.Consumer>
      {(value) => (
        <Draggable draggableId={convertToStringId(item)} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={getItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              <div className="task">
                {isEditingTask ? (
                  <input
                    type="text"
                    defaultValue={item}
                    onKeyDown={_handleKeyDown}
                  />
                ) : (
                    <span>{item}</span>
                  )}
                <FontAwesomeIcon
                  icon={faEdit}
                  className="icon"
                  onClick={() => setEditingTask(true)}
                />
              </div>
            </div>
          )}
        </Draggable>
      )}
    </BoardContext.Consumer>
  );
}

export default CardItem;