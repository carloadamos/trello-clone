/* eslint-disable react/prop-types */
// Package
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';

// Component
import CardItem from '../card-item/card-item.component';

// Utilities
import { convertToStringId } from '../utilities/convert-to-string-id.utility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// Styles
import {
  StyledAddItem,
  StyledCardList,
  StyledTitleBar,
  StyledIcon,
  StyledInlineIcon
} from './StyledCardList';

import { StyledInputText } from '../../styles/GenericStyledComponents';

// Context
import BoardContext from '../BoardContext';

const CardList = (props) => {
  const [addingItem, setAddingItem] = useState(false);
  const { index, taskList, addItem } = props;
  const { title } = taskList;

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? 'lightblue' : '#FEB2B2',
    height: 'min-content',
    padding: 8,
    width: 250
  });

  /**
   * Render textbox for adding new task.
   */
  const _renderInputField = () => {
    return <StyledInputText onKeyDown={_handleKeyDown}></StyledInputText>;
  };

  /**
   * Kydown handler.
   * @param {Object} event Event object.
   */
  const _handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addItem(index, event.target.value);
      setAddingItem(false);
    }

    if (event.key === 'Escape') {
      setAddingItem(false);
    }
  };

  return (
    <BoardContext.Consumer>
      {(value) => (
        <Droppable droppableId={String(index)}>
          {(provided, snapshot) => (
            <StyledCardList
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}>
              <StyledTitleBar>
                <p>{title}</p>
                <StyledIcon>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="icon"
                    onClick={() => value.removeList(index)}></FontAwesomeIcon>
                </StyledIcon>
              </StyledTitleBar>
              {taskList.tasks.map((item, index) => (
                <CardItem key={convertToStringId(item)} item={item} index={index} list={title} />
              ))}
              {provided.placeholder}

              <StyledAddItem
                onClick={() => {
                  setAddingItem(true);
                }}>
                {!addingItem ? (
                  <div>
                    <StyledInlineIcon>
                      <FontAwesomeIcon
                        icon={faPlus}
                        color="#F7FAFC"
                        className="icon"></FontAwesomeIcon>
                      <p>Add another task</p>
                    </StyledInlineIcon>
                  </div>
                ) : (
                  _renderInputField()
                )}
              </StyledAddItem>
            </StyledCardList>
          )}
        </Droppable>
      )}
    </BoardContext.Consumer>
  );
};

export default CardList;
