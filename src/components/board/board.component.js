import React, { Component } from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import CardList from "../card-list/card-list.component";
import { convertToStringId } from "../utilities/convert-to-string-id.utility";
import axios from "axios";

import "./board.style.css";

export default class Board extends Component {
  constructor() {
    super();

    this.state = {
      addList: false,
      list: [],
    };
  }

  componentDidMount() {
    this._fetchTaskList();
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board">
          <Droppable
            droppableId="droppable"
            type="droppableItem"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div className="board__card-list" ref={provided.innerRef}>
                {this.state.list.map((taskList, index) => (
                  <Draggable
                    draggableId={String(index)}
                    index={index}
                    key={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <CardList
                          addItem={this.addItem}
                          key={index}
                          index={index}
                          taskList={taskList}
                        />
                        {provided.placeholder}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {this._renderAddList()}
        </div>
      </DragDropContext>
    );
  }

  /**
   * Render add button and text field.
   */
  _renderAddList() {
    return (
      <div>
        {this.state.addList ? (
          <input
            className="title-textbox"
            type="text"
            onKeyDown={this._handleKeyDown}
          />
        ) : (
          <button
            className="board__add-list"
            onClick={() => this.setState({ addList: true })}
          >
            Add list
          </button>
        )}
      </div>
    );
  }

  /**
   * Add item to the list.
   * @param {Number} selectedListIndex Selected list index.
   * @param {Object} task New item.
   */
  addItem = (selectedListIndex, task) => {
    let temporaryList = this.state.list;

    if (!task) return;

    if (this.exists(temporaryList, task)) return;

    temporaryList[selectedListIndex].tasks = [
      ...temporaryList[selectedListIndex].tasks,
      task,
    ];

    this.setState({ list: temporaryList });
    this.updateList(temporaryList[selectedListIndex]);
  };

  /**
   * Add new list.
   * @param {String} title Title of new list.
   */
  addList = (title) => {
    if (!title) return;

    axios
      .post("http://localhost:5000/list/add", { title })
      .then((response) => {
        if (response.status === 200) {
          this._fetchTaskList();
        }
      })
      .catch((err) => console.error(err));
  };

  /**
   * Checks if item exists in the whole list.
   * @param {Array} list Prop list
   * @param {Object} newTask Task to add
   */
  exists = (list, newTask) => {
    let task, itemObj;

    for (itemObj of list) {
      for (task of itemObj.tasks) {
        if (convertToStringId(task) === convertToStringId(newTask)) {
          console.error("Task already exists!");
          return true;
        }
      }
    }
  };

  /**
   * Kydown handler.
   * @param {Object} event Event object.
   */
  _handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.addList(event.target.value);
      this.setState({ addList: false });
    }

    if (event.key === "Escape") {
      this.setState({ addList: false });
    }
  };

  /**
   * Fetch task list.
   */
  _fetchTaskList() {
    axios
      .get(`http://localhost:5000/list`)
      .then((response) => {
        this.setState({ list: response.data });
      })
      .catch((err) => console.error(`Error fetching data: ${err}`));
  }

  /**
   * Moves an item from one list to another list.
   */
  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  /**
   * Set of procedure to perform when draggin ends.
   * @param {Object} result Result of dragging
   */
  onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    if (result.type === "droppableItem") {
      const items = this.reorder(
        this.state.list,
        source.index,
        destination.index
      );

      this.setState({
        list: items,
      });
    } else {
      if (source.droppableId === destination.droppableId) {
        const list = this.reorder(
          this.state.list[source.droppableId].tasks,
          source.index,
          destination.index
        );
        let temporaryList = this.state.list;

        temporaryList[source.droppableId].tasks = list;
        this.setState({ list: temporaryList });
        this.updateList(temporaryList[source.droppableId]);
      } else {
        const list = this.move(
          this.state.list[source.droppableId].tasks,
          this.state.list[destination.droppableId].tasks,
          source,
          destination
        );
        let temporaryList = this.state.list;

        temporaryList[source.droppableId].tasks = list[source.droppableId];
        temporaryList[destination.droppableId].tasks =
          list[destination.droppableId];
        this.setState({ list: temporaryList });
        this.updateList(temporaryList[source.droppableId]);
        this.updateList(temporaryList[destination.droppableId]);
      }
    }
  };

  /**
   * Reorder items in same list.
   * @param {Array} list List
   * @param {number} startIndex Index
   * @param {number} endIndex Index
   */
  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Update affected list.
   * @param {Array} list Task list array.
   */
  updateList = (list) => {
    axios
      .put(`http://localhost:5000/list/update/${list._id}`, list)
      .catch((err) => console.error(`Error fetching data: ${err}`));
  };
}
