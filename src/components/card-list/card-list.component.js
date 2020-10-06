// Package
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";

// Component
import CardItem from "../card-item/card-item.component";

// Utilities
import { convertToStringId } from "../utilities/convert-to-string-id.utility";

// Styles
import { StyledAddItem, StyledCardList } from "./StyledCardList";

const CardList = (props) => {
  const [addingItem, setAddingItem] = useState(false);
  const { index, taskList, addItem } = props;
  const { title } = taskList;
  const grid = 8;

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "#FEB2B2",
    height: "min-content",
    padding: grid,
    width: 250,
  });

  /**
   * Render textbox for adding new task.
   */
  const _renderInputField = () => {
    return <input type="text" onKeyDown={_handleKeyDown} />;
  };

  /**
   * Kydown handler.
   * @param {Object} event Event object.
   */
  const _handleKeyDown = (event) => {
    if (event.key === "Enter") {
      addItem(index, event.target.value);
      setAddingItem(false);
    }

    if (event.key === "Escape") {
      setAddingItem(false);
    }
  };

  return (
    <Droppable droppableId={String(index)}>
      {(provided, snapshot) => (
        <StyledCardList
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
          {...provided.droppableProps}
        >
          <p>{title}</p>
          {taskList.tasks.map((item, index) => (
            <CardItem
              key={convertToStringId(item)}
              item={item}
              index={index}
              list={title}
            />
          ))}
          {provided.placeholder}

          <StyledAddItem
            onClick={() => {
              setAddingItem(true);
            }}
          >
            {!addingItem ? <p>Add item</p> : _renderInputField()}
          </StyledAddItem>
        </StyledCardList>
      )}
    </Droppable>
  );
};

export default CardList;
