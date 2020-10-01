// Package
import React, { Component } from "react";
import { Draggable } from "react-beautiful-dnd";

// Utilities
import { convertToStringId } from "../utilities/convert-to-string-id.utility";

const grid = 8;
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "#C53030" : "#FFF5F5",

  // styles we need to apply on draggables
  ...draggableStyle,
});

export default class CardItem extends Component {
  render() {
    const { item, index } = this.props;

    return (
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
            {item}
          </div>
        )}
      </Draggable>
    );
  }
}
