"use client";

import { faEllipsis, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Home() {
  const [cardGroup, setCardGroup] = useState([
    {
      id: "a",
      index: 1,
      name: "To Do",
      tasks: [
        {
          id: "aa",
          index: 0,
          name: "Here and There",
          desc: "i am here and there",
          time: "12.03.23",
        },
        {
          id: "ab",
          index: 1,
          name: "There and Here",
          desc: "i am There and here",
          time: "21.07.23",
        },
      ],
    },
    {
      id: "b",
      index: 2,
      name: "Doing",
      tasks: [
        {
          id: "ba",
          index: 0,
          name: "I and You",
          desc: "i am here and there",
          time: "12.03.23",
        },
        {
          id: "bb",
          index: 1,
          name: "You And I",
          desc: "i am There and here",
          time: "21.07.23",
        },
        {
          id: "bc",
          index: 2,
          name: "who are you here",
          desc: "i am There and here",
          time: "21.07.23",
        },
      ],
    },
  ]);

  const handleCardMove = (result: any) => {
    if (!result.destination) return;
    const localCard = Array.from(cardGroup);
    const [draggedCard] = localCard.splice(result.source.index, 1);
    localCard.splice(result.destination.index, 0, draggedCard);
    setCardGroup(localCard);
    console.log(cardGroup, localCard);
    console.log(result.source.index, result.destination.index);
  };

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen gap-5 overflow-y-hidden bg-[#474849]">
      <div className="font-medium text-4xl text-white mt-5">Taskoooo</div>
      <div className="container flex-1">
        <DragDropContext onDragEnd={handleCardMove}>
          <Droppable droppableId="card" direction="horizontal">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="snap-x snap-center w-full overflow-x-scroll p-5 snap-mandatory block bg-slate-300 bg-opacity-60"
              >
                {cardGroup.map((card, index) => {
                  return (
                    <Draggable
                      draggableId={cardGroup[index].id}
                      index={1}
                      key={index}
                    >
                      {(provided) => {
                        return (
                          <div
                            className="w-[320px] max-w-[90vw] rounded-xl bg-[#101204] mx-2 inline-block p-10"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {card.name}
                            {/* <TaskCard card={card} /> */}
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </main>
  );
}

const TaskCard = ({ card }: { card: Card }) => {
  const handleTaskMove = () => {};
  return (
    <div className="items flex flex-col w-full h-full p-4 gap-2">
      <div className="header text-sm flex justify-between">
        <div className="name opacity-90 font-medium">{card.name}</div>
        <FontAwesomeIcon icon={faEllipsis} className="w-5 h-5" />
      </div>
      <DragDropContext onDragEnd={handleTaskMove}>
        <Droppable droppableId="task">
          {(providedtask) => (
            <div
              className="taskContainer flex flex-col gap-3 py-3"
              ref={providedtask.innerRef}
              {...providedtask.droppableProps}
            >
              {card.tasks.map(({ id, name, desc, time, index }, ind) => {
                return (
                  <Draggable draggableId={id.toString()} index={1} key={ind}>
                    {(providedtask) => (
                      <div
                        className="footer flex gap-2 p-2 px-3 bg-[#282f27] rounded-md"
                        key={ind}
                        ref={providedtask.innerRef}
                        {...providedtask.draggableProps}
                        {...providedtask.dragHandleProps}
                      >
                        <span className="opacity-70 font-medium ">{name}</span>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {providedtask.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="footer flex gap-2 p-2 hover:bg-[#282f27] rounded-md">
        <FontAwesomeIcon icon={faPlus} className="w-5 h-5 opacity-50" />
        <span className="opacity-50 font-medium text-sm">Create</span>
      </div>
    </div>
  );
};
