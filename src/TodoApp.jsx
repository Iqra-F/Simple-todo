import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TodoApp() {
  const [todos, setTodos] = useState([]); //array holding the list of todo items
  const [todoInput, setTodoInput] = useState(""); //input field for adding new tasks
  const [todoDescription, setTodoDescription] = useState(""); // input field for adding descriptions
  const [editIndex, setEditIndex] = useState(null); //index of the todo item being edited.
  const [editValue, setEditValue] = useState(""); //input field for editing the task name.
  const [editDescription, setEditDescription] = useState(""); //input field for editing the desc.
  const [selectedDate, setSelectedDate] = useState(null); //input field to select a date
  const [modal, setModal] = useState(false); //to manage the visibility of modal for updation
  const [modalDelete, setModalDelete] = useState(false); //to manage the visibility of modal for deletion
  const [showNameError, setShowNameError] = useState(false);
  const [showDescError, setShowDescError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);

  // const [showError, setShowError] = useState(false)

  const toggleUpdate = () => setModal(!modal); //to toggle the visibility of modal for updation
  const toggleDelete = () => setModalDelete(!modalDelete); //to toggle the visibility of modal for deletion

  const addTodo = () => {
    //   if (!todoInput.trim() || !todoDescription.trim() || !selectedDate ) {
    //  //if a user leaves any i/p field empty, a msg will appear
    //  //!todoInput.trim() means if empty spaces are not removed
    //  // !selectedDate means if selectedDate is null, undefined, or an empty string

    //     setShowError(true);
    //       return;
    // }
    // setShowError(false);
    try {
      if (!todoInput.trim()) {
        //if field is empty?

        //if a user leaves any i/p field empty, a msg will appear
        //!todoInput.trim() means if empty spaces are not removed

        setShowNameError(true);
        return;
      }
      setShowNameError(false); //clear error

      if (!todoDescription.trim()) {
        //if field is empty?
        setShowDescError(true);
        return;
      }
      setShowDescError(false);

      if (!selectedDate) {
        //if field is empty?
        // !selectedDate means if selectedDate is null, undefined, or an empty string
        setShowDateError(true);
        return;
      }

      setShowDateError(false);
    } catch (error) {
      console.log(error);
    }

    if (selectedDate < new Date()) {
      //past date not allowed
      return window.alert("Can't set previous date!");
    }

    //adding a new todo object to the existing array
    setTodos([
      ...todos,
      {
        text: todoInput,
        description: todoDescription,
        date: selectedDate,
        completed: false,
      },
    ]);
    //after setting the values to new object's properties, the i/p fields are cleared
    setTodoInput("");
    setTodoDescription("");
    setSelectedDate(null);
  };
  //delete function
  const deleteTodo = (index) => {
    const updatedTodos = [...todos]; // creating a copy of current todos array(spread operator).The original todos array remains unchanged and immutable
    updatedTodos.splice(index, 1); //deleting only one item
    setTodos(updatedTodos); // array modified
    toggleDelete();
  };

  //update button in popup
  const updateTodo = () => {
    if (!editValue.trim() || !selectedDate) {
      return window.alert("Task name and date are required!");
    }
    if (selectedDate < new Date()) {
      return window.alert("Can't set the previous date!");
    }
    const updatedTodos = [...todos];
    updatedTodos[editIndex] = {
      text: editValue,
      description: editDescription,
      date: selectedDate,
      completed: false,
    };
    setTodos(updatedTodos);
    toggleUpdate(); //popup will disappear after updation
    setTimeout(() => {
      //alert after updation
      alert("Task Edited successfully!");
    }, 2000);
  };

  const completeTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    //the completion status of the todo item at the specified index will be toggled,
    // means k agr completed==ture hy then completed==false ho jaye ga
    // If the task is marked as completed, the button text changes to "Undo"; otherwise, it displays "Completed"

    setTodos(updatedTodos);
  };

  return (
    <div className="container w-[100%] h-full mx-0  bg-cyan-300 p-4">
      <h1 className="text-3xl text-center mb-4">Todo App</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex flex-col">
          <p>Name:</p>
          <input
            type="text"
            placeholder="Task"
            value={todoInput}
            // setting task name
            onChange={(e) => setTodoInput(e.target.value)}
            className="p-2 mr-2 border rounded"
          />
          {showNameError && (
            <span className="block w-full p-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-red-600">
              Please fill in the input field
            </span>
          )}{" "}
        </div>

        <div className="flex flex-col">
          <p>Description:</p>
          <input
            type="text"
            placeholder="Description"
            value={todoDescription}
            //setting desc
            onChange={(e) => setTodoDescription(e.target.value)}
            className="p-2 mr-2 border rounded"
          />
          {showDescError && (
            <span className="block bg-white w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-red-600">
              Please fill in the input field
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <p>Date:</p>
          {/* setting a due date */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select Date"
            className="p-2 border rounded"
          />
          {showDateError && (
            <span className="block w-full bg-white p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500  text-red-600">
              Please fill in the input field
            </span>
          )}{" "}
        </div>
        <button
          onClick={addTodo}
          disabled={!todoInput.trim() || !selectedDate} //disabled when any i/p field is empty
          className="bg-rose-400 text-white p-1 ml-2 h-11 rounded"
        >
          Add Todo
        </button>
      </div>

      <ul>
        <div className="flex flex-col justify-evenly gap-9">
          {/* iterating over the todos array, 'todo' is one item and 'index' is its index  */}
          {todos.map((todo, index) => (
            <li key={index} className="mb-2">
              {/* todo.completed ? when task completed, this classname applies a line-through style to the text*/}

              <strong className={todo.completed ? "line-through" : ""}>
                {todo.text}
              </strong>

              {/* If todo.description exists and is not empty, the expression after && is evaluated. */}

              {todo.description && (
                <p className={todo.completed ? "line-through" : ""}>
                  {todo.description}
                </p>
              )}

              {/* .toLocaleDateString() converts a Date object into a string */}
              {todo.date && <p>Due Date: {todo.date.toLocaleDateString()}</p>}
              <div className="flex flex-col md:flex-row gap-2 ">
                {/* when clicked, triggers the deleteTodo function with the current index as an argument. This function removes the corresponding task from the todos array. */}
                <button
                  onClick={() => {
                    // setEditIndex(index); //index of task to be edited
                    // setEditValue(todo.text); //pre-filling the task's current value
                    // setEditDescription(todo.description); //pre-filling the task's current desc
                    // setSelectedDate(todo.date); //pre-filling the currently set date
                    toggleDelete(); //toggling the popup visibility=true
                  }}
                  className="bg-red-500 text-white px-1 w-auto py-1 mr-2 rounded"
                >
                  Delete
                </button>

                {/* When edit button is clicked, this button prepares the edit form(popup) by setting the index of the task to be edited (setEditIndex) */}
                <button
                  onClick={() => {
                    setEditIndex(index); //index of task to be edited
                    setEditValue(todo.text); //pre-filling the task's current value
                    setEditDescription(todo.description); //pre-filling the task's current desc
                    setSelectedDate(todo.date); //pre-filling the currently set date
                    toggleUpdate(); //toggling the popup visibility=true
                  }}
                  className="bg-yellow-500 text-white px-4 py-1 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => completeTodo(index)}
                  className="bg-green-500 text-white px-4 py-1 rounded"
                >
                  {todo.completed ? "undo" : "Completed"}
                </button>
              </div>
            </li>
          ))}
        </div>
      </ul>

      {/* popup for updation */}
      <Modal className="mt-6" isOpen={modal} toggle={toggleUpdate}>
        <ModalBody>
          <div className="">
            <p>Edit Name:</p>
            <input
              type="text"
              placeholder="Task"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="p-2 mb-2 border rounded w-full"
            />
          </div>

          <div className="">
            <p>Edit Description:</p>
            <input
              type="text"
              placeholder="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="p-2 mb-2 border rounded w-full"
            />
          </div>

          <div className="">
            <p>Edit Date:</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
              className="p-2 border rounded w-full"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="bg-blue-800" onClick={updateTodo}>
            Update
          </Button>{" "}
          <Button className="bg-gray-700" onClick={toggleUpdate}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* popup for deletion */}

      <Modal isOpen={modalDelete} toggle={toggleDelete}>
        <ModalHeader toggle>Please Confirm again before press OK!</ModalHeader>
        <ModalBody>
          <p>You are Deleting The Todo</p>
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-purple-800"
            onClick={() => deleteTodo(editIndex)}
          >
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default TodoApp;
// const [modal, setModal] = useState(false);
// const toggle = () => {
// setModal(!modal);
// };
