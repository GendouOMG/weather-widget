import './AddedCities.scss';
// import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


function AddedCities({ cityList, setCityList, removeCity }) {

  function handleOnDragEnd(result) {
    // console.log(result);
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const items = Array.from(cityList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCityList(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="AddedCities">
        {(provided) => (
          <ul className="AddedCities" {...provided.droppableProps} ref={provided.innerRef}>
            {cityList.map( (city, index) =>
              <Draggable key={city.id} draggableId={city.id.toString()} index={index}>
                {(provided) => (
                  <li className="AddedCities__single-city" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <p className="AddedCities__name">{city.name}, {city.country}</p>
                    <button className="AddedCities__remove-btn" type="button" onClick={()=>removeCity(index)}></button>
                  </li>
                )}
              </Draggable>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default AddedCities;