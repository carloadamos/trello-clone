// Package
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

// Utilities
import { convertToStringId } from "../utilities/convert-to-string-id.utility";

// Styles
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { StyledInputText, StyledSpan, StyledTask } from "./StyledCardItem";

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

const CardItem = (props) => {
  const [isEditingTask, setEditingTask] = useState(false);
  const { item, index, list } = props;

  const _handleKeyDown = ({ updateTask }, index, list, event) => {
    if (event.key === "Escape") {
      setEditingTask(false);
    }

    if (event.key === "Enter") {
      updateTask(index, list, event.target.value);
      setEditingTask(false);
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
              <StyledTask>
                {isEditingTask ? (
                  <StyledInputText
                    defaultValue={item}
                    onKeyDown={_handleKeyDown.bind(this, value, index, list)}
                  ></StyledInputText>
                ) : (
                  <StyledSpan>{item}</StyledSpan>
                )}
                <FontAwesomeIcon
                  icon={faEdit}
                  className="icon"
                  onClick={() => setEditingTask(true)}
                />
              </StyledTask>
            </div>
          )}
        </Draggable>
      )}
    </BoardContext.Consumer>
  );
};

export default CardItem;
