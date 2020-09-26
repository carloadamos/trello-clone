import React, { Component } from 'react';
import './card-list.style.css';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';

export default class CardList extends Component {
  constructor() {
    super();

    this.state = {
      title: 'Doing',
      list: [
        { description: 'Watch YouTube videos' },
        { description: 'Criticize life choices' },
        { description: 'Exercise' }
      ],
      randomNumber: Math.floor(Math.random() * 100),
    };
  }

  render() {
    const title = this.state.title;
    const dropId = "droppable" + this.state.randomNumber;

    return (
      <DragDropContext>
        <Droppable droppableId={dropId}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={{ backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey' }}
              {...provided.droppableProps}
              className="card-list">
              <div className="card-list__header">
                <p>{title}</p>
              </div>
              <div
                className="card-list__content">
                {this._renderCardList()}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }

  /**
   * Render another card.
   */
  _renderAnotherCard() {
    const title = this.state.title;

    return (
      <div className="card-list__another" key={title}>
        <p>Add another card</p>
      </div>
    );
  }

  /**
   * Render card list.
   * @returns {ReactElement} Card list.
   */
  _renderCardList() {
    const items = this.state.list;

    let list = items.map((item, index) => {
      const itemElement = this._renderCardListItem(item, index);

      return itemElement;
    });

    list = [...list, this._renderAnotherCard()];

    return list;
  }

  /**
   * Render card list item.
   * @returns {ReactElement} Card item.
   */
  _renderCardListItem(item, index) {
    const rand = this.state.randomNumber;
    const dragId = "draggable-" + item.description + rand;

    console.log(dragId)
    return (
      <Draggable
        draggableId={dragId}
        index={index}
        key={dragId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            key={item.description + rand}
            className="card-list__item">
            <p>{item.description}</p>
          </div>
        )}
      </Draggable>
    );
  }
}