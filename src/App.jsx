import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { uniqueId } from "lodash";

import "./App.css";
function App() {
  const [todo, setTodo] = useState(() => {
    const storedValue = window.localStorage.getItem("todo-list");
    if (storedValue) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        console.log(error, "there is an error");
      }
    }
    return [];
  });
  useEffect(() => {
    window.localStorage.setItem("todo-list", JSON.stringify(todo));
  }, [todo]);

  const inputRef = useRef();
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleAddToDo();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleAddToDo = () => {
    if (inputRef.current.value.trim() === "") {
      toast.error("you must fill the task first", {
        duration: 1000,
      });
      return;
    }

    const text = inputRef.current.value.trim();
    const newItem = { id: uniqueId("todoId_"), completed: false, text };
    setTodo((prevTodo) => [...prevTodo, newItem]);

    inputRef.current.value = "";
    toast.success("your task has been added successfully", {
      duration: 1500,
    });
  };
  const handleDoneToDo = (id) => {
    const newTodo = todo.map((element) =>
      element.id === id
        ? { ...element, completed: !element.completed }
        : element
    );
    setTodo(newTodo);
    console.log(newTodo);
  };

  const handleDeleteToDo = (id) => {
    const newTodo = todo.filter((element) => element.id !== id);
    setTodo(newTodo);
  };

  return (
    // -----------------------first section---------------------------
    <>
      <h2 className=" text-white text-center mt-5 text-4xl ">
        {" "}
        Your Todo List{" "}
      </h2>
      <div className="todo-container ">
        <div className=" todo-form">
          <input
            type="text"
            placeholder="Add a new task..."
            className="w-90 py-1.25 px-3.75 rounded-[10px] bg-transparent text-custom-purple border-1 border-custom-purple"
            ref={inputRef}
          />
          <button
            onClick={handleAddToDo}
            className="border-0 ml-5 bg-custom-purple py-1.25 px-[13px] rounded-25 hover:bg-button-hover transition-all duration-500"
          >
            <i className="fa-solid fa-plus fa-lg" style={{ color: "white" }} />
          </button>
        </div>

        {/* -----------------------------------second section------------------------------------------------------------ */}
        {todo.filter((item) => {
          return item.completed === false;
        }).length !== 0 && (
          <h3 className="task-title">
            Tasks to do -{" "}
            {
              todo.filter((item) => {
                return item.completed === false;
              }).length
            }{" "}
          </h3>
        )}
        {todo.map(({ completed, text, id }) => {
          if (!completed) {
            return (
              <div className="section-task" key={id}>
                <div className=" text-custom-purple">
                  <p className="m-0	w-64 break-words"> {text} </p>
                </div>

                <div className=" flex">
                  <span>
                    <button className=" btn" onClick={() => handleDoneToDo(id)}>
                      <i className=" fa-solid fa-check fa-lg text-custom-purple  hover:text-button-hover transition-all duration-500" />
                    </button>
                  </span>

                  <span>
                    <button onClick={() => handleDeleteToDo(id)}>
                      <i className="fa-solid fa-trash fa-lg  text-custom-purple  hover:text-button-hover transition-all duration-500" />
                    </button>
                  </span>
                </div>
              </div>
            );
          }
          return undefined;
        })}

        {/* ----------------------third section----------------------- */}
        {todo.filter(({ completed }) => {
          return completed === true;
        }).length !== 0 && (
          <h3 className="task-title">
            Done -{" "}
            {
              todo.filter(({ completed }) => {
                return completed === true;
              }).length
            }{" "}
          </h3>
        )}

        {todo.map(({ completed, id, text }) => {
          if (completed) {
            return (
              <div className="section-task " key={id}>
                <div className=" text-custom-purple">
                  <p
                    className={` ${
                      completed ? "done" : ""
                    } m-0 w-64 break-words	`}
                  >
                    {text}
                  </p>{" "}
                </div>

                <div>
                  <span>
                    <button className=" btn" onClick={() => handleDoneToDo(id)}>
                      <i className="  text-custom-purple  fa-solid fa-arrow-left-long fa-lg hover:text-button-hover transition-all duration-500" />
                    </button>
                  </span>
                </div>
              </div>
            );
          }
          return undefined;
        })}
        <Toaster />
      </div>
    </>
  );
}

export default App;
