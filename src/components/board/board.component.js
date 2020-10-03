// Package
import React, { Component } from "react";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import axios from "axios";

// Utilities
import { convertToStringId } from "../utilities/convert-to-string-id.utility";

// Component
import CardList from "../card-list/card-list.component";

// Context
import BoardContext from "../BoardContext";

// Styles
import "./board.style.css";

const updateTask = () => {
  console.log("I am the update task from another galaxy");
};
let editingTask = false;

export default class Board extends Component {
  constructor() {
    super();

    this.state = {
      addList: false,
      board: [],
    };
  }

  componentDidMount() {
    this._fetchBoard();
  }

  render() {
    return (
      <BoardContext.Provider value={{ editingTask, updateTask }}>
        <DragDropContext onDragEnd={this._onDragEnd}>
          <div className="board">
            <Droppable
              droppableId="droppable"
              type="droppableItem"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <div className="board__card-list" ref={provided.innerRef}>
                  {Object.keys(this.state.board).length !== 0 &&
                    this.state.board[0].list.map((taskList, index) => (
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
      </BoardContext.Provider>
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
    let temporaryList = this.state.board[0].list;

    if (!task) return;

    if (this._exists(temporaryList, task)) return;

    /**
     * An array in JavaScript is also an object and variables only hold a reference to an object, not the object itself.
     * Thus both variables have a reference to the same object.
     * https://stackoverflow.com/questions/6612385/why-does-changing-an-array-in-javascript-affect-copies-of-the-array
     */
    temporaryList[selectedListIndex].tasks = [
      ...temporaryList[selectedListIndex].tasks,
      task,
    ];

    this._updateBoard(this.state.board[0]);
  };

  /**
   * Add new list.
   * @param {String} title Title of new list.
   */
  _addList = (title) => {
    if (!title) return;

    /**
     * Expectation is that every board has a default
     * title and list so we don't run into some weird
     * shit when accessing `.list`
     */
    let selectedBoard = this.state.board[0];
    selectedBoard.list = [
      ...selectedBoard.list,
      {
        title,
        tasks: [],
      },
    ];

    this._updateBoard(this.state.board[0]);
  };

  /**
   * Checks if item exists in the whole list.
   * @param {Array} list Prop list
   * @param {Object} newTask Task to add
   */
  _exists = (list, newTask) => {
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
      this._addList(event.target.value);
      this.setState({ addList: false });
    }

    if (event.key === "Escape") {
      this.setState({ addList: false });
    }
  };

  /**
   * Fetch board.
   */
  _fetchBoard() {
    axios
      .get(`http://localhost:5000/board`)
      .then(({ data }) => {
        this.setState({ board: data });
      })
      .catch((err) => console.error(`Error fetching data: ${err}`));
  }

  /**
   * Moves an item from one list to another list.
   */
  _move = (source, destination, droppableSource, droppableDestination) => {
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
  _onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) return;

    if (result.type === "droppableItem") {
      let tempBoard = this.state.board[0];
      const items = this._reorder(
        this.state.board[0].list,
        source.index,
        destination.index
      );

      tempBoard.list = items;
    } else {
      if (source.droppableId === destination.droppableId) {
        const list = this._reorder(
          this.state.board[0].list[source.droppableId].tasks,
          source.index,
          destination.index
        );
        let temporaryList = this.state.board[0].list;

        temporaryList[source.droppableId].tasks = list;
      } else {
        const list = this._move(
          this.state.board[0].list[source.droppableId].tasks,
          this.state.board[0].list[destination.droppableId].tasks,
          source,
          destination
        );
        let temporaryList = this.state.board[0].list;

        temporaryList[source.droppableId].tasks = list[source.droppableId];
        temporaryList[destination.droppableId].tasks =
          list[destination.droppableId];
      }
    }
    this._updateBoard(this.state.board[0]);
  };

  /**
   * Reorder items in same list.
   * @param {Array} list List
   * @param {number} startIndex Index
   * @param {number} endIndex Index
   */
  _reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Update affected list.
   * @param {Array} board Task list array.
   */
  _updateBoard = (board) => {
    axios
      .put(`http://localhost:5000/board/update/${board._id}`, board)
      .catch((err) => console.error(`Error fetching data: ${err}`));
  };
}
