import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import CardList from '../card-list/card-list.component';

/**
 * Reorder items in same list.
 * @param {Array} list List
 * @param {number} startIndex Index
 * @param {number} endIndex Index
 */
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export default class Board extends Component {
  constructor() {
    super();

    this.state = {
      list: [
        {
          title: 'Things To Do',
          items: [
            { id: 'one', content: 'one', },
            { id: 'two', content: 'two' },
            { id: 'three', content: 'three' }],
        },
        {
          title: 'Doing',
          items: [
            { id: 'four', content: 'four', },
            { id: 'five', content: 'five' },
            { id: 'six', content: 'six' }]
        },
      ],
    };
  }

  onDragEnd = result => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const list = reorder(
        this.state.list[source.droppableId].items,
        source.index,
        destination.index
      );

      let temporaryList = this.state.list;

      temporaryList[source.droppableId].items = list;

      this.setState({
        list: temporaryList,
      });
    } else {
      const list = move(
        this.state.list[source.droppableId].items,
        this.state.list[destination.droppableId].items,
        source,
        destination
      );

      let temporaryList = this.state.list;
      temporaryList[source.droppableId].items = list[source.droppableId];
      temporaryList[destination.droppableId].items = list[destination.droppableId];

      this.setState({
        list: temporaryList,
      });
    }
  };

  render() {
    return (
      <div className="board">
        <DragDropContext onDragEnd={this.onDragEnd}>
          {this.state.list.map((listItem, index) => (
            <CardList
              key={index}
              index={index}
              listItem={listItem}
            />
          ))}
        </DragDropContext>
      </div>
    );
  }
}