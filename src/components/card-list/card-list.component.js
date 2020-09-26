import React, { Component } from 'react';
import './card-list.style.css';
import { Droppable } from 'react-beautiful-dnd';
import CardItem from './card-item/card-item.component'

const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});

export default class CardList extends Component {
  render() {
    const { index, listItem } = this.props;

    return (
      <Droppable
        droppableId={String(index)}>
        {(provided, snapshot) => (
          <div
            className="card-list"
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {listItem.items.map((item, index) => (
              <CardItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
  }
}