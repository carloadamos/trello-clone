import React, { Component } from "react";
import "./card-list.style.css";
import { Droppable } from "react-beautiful-dnd";
import CardItem from "../card-item/card-item.component";

const grid = 8;
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "#FEB2B2",
  height: "min-content",
  padding: grid,
  width: 250,
});

export default class CardList extends Component {
  constructor() {
    super();

    this.state = {
      addingItem: false,
    };
  }

  render() {
    const { index, listItem } = this.props;

    return (
      <Droppable droppableId={String(index)}>
        {(provided, snapshot) => (
          <div
            className="card-list"
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            <p>{listItem.title}</p>
            {listItem.tasks.map((item, index) => (
              <CardItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}

            <div
              className="card-list__add"
              onClick={() => {
                this.setState({ addingItem: true });
              }}
            >
              {!this.state.addingItem ? (
                <p>Add item</p>
              ) : (
                this._renderInputField()
              )}
            </div>
          </div>
        )}
      </Droppable>
    );
  }

  _renderInputField() {
    return <input type="text" onKeyDown={this._handleKeyDown} />;
  }

  /**
   * Kydown handler.
   * @param {Object} event Event object.
   */
  _handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.props.addItem(this.props.index, event.target.value);
      this.setState({ addingItem: false });
    }

    if (event.key === "Escape") {
      this.setState({ addingItem: false });
    }
  };
}
