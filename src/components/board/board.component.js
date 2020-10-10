// Package
import React, { useEffect, useState } from 'react';
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd';
import axios from 'axios';

// Utilities
import { convertToStringId } from '../utilities/convert-to-string-id.utility';

// Component
import CardList from '../card-list/card-list.component';
import Header from '../header/header.component';

// Context
import BoardContext from '../BoardContext';

// Styles
import {
    StyledBoard,
    StyledBoardList,
    StyledTitleInput,
    StyledAddButton,
    StyledMinContent
} from './StyledBoard';

const Board = () => {
    const [addList, setAddList] = useState(false);
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        _fetchBoard();
    }, []);

    const updateTask = (index, list, value) => {
        for (let boardList of board[0].list) {
            if (convertToStringId(boardList.title) === convertToStringId(list)) {
                boardList.tasks.splice(index, 1, value);
                _updateBoard(board[0]);
                return;
            }
        }
    };

    const removeTask = (index, list) => {
        for (let boardList of board[0].list) {
            if (convertToStringId(boardList.title) === convertToStringId(list)) {
                boardList.tasks.splice(index, 1);
                _updateBoard(board[0]);
                return;
            }
        }
    };

    const removeList = (index) => {
        board[0].list.splice(index, 1);
        _updateBoard(board[0]);
    };

    /**
     * Render add button and text field.
     */
    const _renderAddList = () => {
        return (
            <div>
                {addList ? (
                    <StyledTitleInput type="text" onKeyDown={_handleKeyDown} />
                ) : (
                    <StyledAddButton onClick={() => setAddList(true)}>Add list</StyledAddButton>
                )}
            </div>
        );
    };

    /**
     * Add item to the list.
     * @param {Number} selectedListIndex Selected list index.
     * @param {Object} task New item.
     */
    const addItem = (selectedListIndex, task) => {
        let temporaryList = board[0].list;

        if (!task) return;

        if (_exists(temporaryList, task)) return;

        /**
         * An array in JavaScript is also an object and variables only hold a reference to an object, not the object itself.
         * Thus both variables have a reference to the same object.
         * https://stackoverflow.com/questions/6612385/why-does-changing-an-array-in-javascript-affect-copies-of-the-array
         */
        temporaryList[selectedListIndex].tasks = [...temporaryList[selectedListIndex].tasks, task];

        _updateBoard(board[0]);
    };

    /**
     * Add new list.
     * @param {String} title Title of new list.
     */
    const _addList = (title) => {
        if (!title) return;

        /**
         * Expectation is that every board has a default
         * title and list so we don't run into some weird
         * shit when accessing `.list`
         */
        let selectedBoard = board[0];
        selectedBoard.list = [
            ...selectedBoard.list,
            {
                title,
                tasks: []
            }
        ];

        _updateBoard(board[0]);
    };

    /**
     * Checks if item exists in the whole list.
     * @param {Array} list Prop list
     * @param {Object} newTask Task to add
     */
    const _exists = (list, newTask) => {
        let task, itemObj;

        for (itemObj of list) {
            for (task of itemObj.tasks) {
                if (convertToStringId(task) === convertToStringId(newTask)) {
                    console.error('Task already exists!');
                    return true;
                }
            }
        }
    };

    /**
     * Kydown handler.
     * @param {Object} event Event object.
     */
    const _handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            _addList(event.target.value);
            setAddList(false);
        }

        if (event.key === 'Escape') {
            setAddList(false);
        }
    };

    /**
     * Fetch board.
     */
    const _fetchBoard = () => {
        axios
            .get(`http://localhost:5000/board`)
            .then(({ data }) => {
                setBoard(data);
            })
            .catch((err) => console.error(`Error fetching data: ${err}`));
    };

    /**
     * Moves an item from one list to another list.
     */
    const _move = (source, destination, droppableSource, droppableDestination) => {
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
    const _onDragEnd = (result) => {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) return;

        if (result.type === 'droppableItem') {
            let tempBoard = board[0];
            const items = _reorder(board[0].list, source.index, destination.index);

            tempBoard.list = items;
        } else {
            if (source.droppableId === destination.droppableId) {
                const list = _reorder(
                    board[0].list[source.droppableId].tasks,
                    source.index,
                    destination.index
                );
                let temporaryList = board[0].list;

                temporaryList[source.droppableId].tasks = list;
            } else {
                const list = _move(
                    board[0].list[source.droppableId].tasks,
                    board[0].list[destination.droppableId].tasks,
                    source,
                    destination
                );
                let temporaryList = board[0].list;

                temporaryList[source.droppableId].tasks = list[source.droppableId];
                temporaryList[destination.droppableId].tasks = list[destination.droppableId];
            }
        }

        _updateBoard(board[0]);
    };

    /**
     * Reorder items in same list.
     * @param {Array} list List
     * @param {number} startIndex Index
     * @param {number} endIndex Index
     */
    const _reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    /**
     * Update affected list.
     * @param {Array} board Task list array.
     */
    const _updateBoard = (board) => {
        setLoading(true);
        axios
            .put(`http://localhost:5000/board/update/${board._id}`, board)
            .then(() => setLoading(false))
            .catch((err) => console.error(`Error fetching data: ${err}`));
    };

    return (
        <BoardContext.Provider value={{ updateTask, removeTask, removeList }}>
            <Header></Header>
            <DragDropContext onDragEnd={_onDragEnd}>
                <StyledBoard>
                    <Droppable droppableId="droppable" type="droppableItem" direction="horizontal">
                        {(provided) => (
                            <StyledBoardList ref={provided.innerRef}>
                                {Object.keys(board).length !== 0 &&
                                    board[0].list.map((taskList, index) => (
                                        <StyledMinContent key={index}>
                                            <Draggable
                                                className="vertical-list"
                                                draggableId={String(index)}
                                                index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}>
                                                        <CardList
                                                            addItem={addItem}
                                                            key={index}
                                                            index={index}
                                                            taskList={taskList}
                                                            loading={loading}
                                                        />
                                                        {provided.placeholder}
                                                    </div>
                                                )}
                                            </Draggable>
                                        </StyledMinContent>
                                    ))}
                                {provided.placeholder}
                            </StyledBoardList>
                        )}
                    </Droppable>
                    {_renderAddList()}
                </StyledBoard>
            </DragDropContext>
        </BoardContext.Provider>
    );
};

export default Board;
