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
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';

// Styles
import {
  StyledAddItem,
  StyledCardList,
  StyledTitleBar,
  StyledIcon,
  StyledInlineIcon
} from './StyledCardList';

// Generic Styles
import {
  PlainRow,
  StyledInputText,
  StyledButton,
  StyledCard
} from '../../styles/GenericStyledComponents';

// Context
import BoardContext from '../BoardContext';

const CardList = (props) => {
  const [addingItem, setAddingItem] = useState(false);
  const [newTask, setNewTask] = useState('');
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
    return (
      <StyledCard backgroundColor={'#FFF'}>
        <StyledInputText type="text" onKeyUp={_handleKeyUp} />
        <PlainRow gap={'0 0.5rem'}>
          <StyledButton
            borderRadius={'4px'}
            margin={'0.5rem 0'}
            onClick={() => {
              addItem(index, newTask);
              setAddingItem(false);
            }}>
            <span>Add</span>
          </StyledButton>
          <FontAwesomeIcon icon={faTimes} className="icon" onClick={() => setAddingItem(false)} />
        </PlainRow>
      </StyledCard>
    );
  };

  /**
   * Kydown handler.
   * @param {Object} event Event object.
   */
  const _handleKeyUp = (event) => {
    setNewTask(event.target.value);

    if (event.key === 'Enter') {
      addItem(index, newTask);
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

              {!addingItem ? (
                <StyledAddItem
                  onClick={() => {
                    setAddingItem(true);
                  }}>
                  <div>
                    <StyledInlineIcon>
                      <FontAwesomeIcon
                        icon={faPlus}
                        color="#F7FAFC"
                        className="icon"></FontAwesomeIcon>
                      <p>Add another task</p>
                    </StyledInlineIcon>
                  </div>
                </StyledAddItem>
              ) : (
                _renderInputField()
              )}

              {provided.placeholder}
            </StyledCardList>
          )}
        </Droppable>
      )}
    </BoardContext.Consumer>
  );
};

export default CardList;
