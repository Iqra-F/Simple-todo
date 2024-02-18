import React, { useState,useEffect } from "react";
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
  const [emptyTodoText, setEmptyTodoText] = useState(false)

  // const [showError, setShowError] = useState(false)

  const toggleUpdate = () => setModal(!modal); //to toggle the visibility of modal for updation
  const toggleDelete = () => setModalDelete(!modalDelete); //to toggle the visibility of modal for deletion

  //Check if todos array is empty and set emptyTodoText state accordingly
  useEffect(() => {
    setEmptyTodoText(todos.length === 0);
  }, [todos]);

  const addTodo = (e) => {

    // Get the form and its input fields
    e.preventDefault();
    const form = document.getElementById("todoForm");
    const inputs = form.getElementsByTagName("input");
    
   
    
  
    // Check if any input field is empty
    let isEmpty = false;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value.trim() === "") {
        isEmpty = true;
        break;
      }
    }
  
    if (isEmpty) {
      form.reportValidity();
      return;
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
  //settinhg values
  const setValues =(  ind,
  val,
  desc,
  date 
  )=>{
    setEditIndex(ind)
    setEditValue(val)
    setEditDescription(desc)
    setSelectedDate(date)
    toggleUpdate()
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
    <div className="w-full min-h-screen p-4 bg-black c">
      <h1 className="mb-4 text-5xl font-extrabold text-center text-white">Todo App</h1>
      <div className="flex w-full p-5 bg-teal-700 justify-evenly">
      <form action="" id="todoForm" onSubmit={(e) =>  addTodo(e)}>
      <div className="flex flex-col gap-4 mb-4 md:flex-row">
        <div className="flex flex-col">
          <p className="font-bold">Name:</p>
          <input
            type="text"
            placeholder="Task"
            value={todoInput}
            required
            // setting task name
            onChange={(e) => setTodoInput(e.target.value)}
            className="p-2 mr-2 border rounded"
          />
          {/* {showNameError && (
            <span className="block w-full p-2 text-red-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              Please fill in the input field
            </span>
          )}{" "} */}
        </div>

        <div className="flex flex-col">
          <p className="font-bold">Description:</p>
          <input
            type="text"
            placeholder="Description"
            value={todoDescription}
            required
            //setting desc
            onChange={(e) => setTodoDescription(e.target.value)}
            className="p-2 mr-2 border rounded"
          />
          {/* {showDescError && (
            <span className="block w-full p-2 text-red-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              Please fill in the input field
            </span>
          )} */}
        </div>

        <div className="flex flex-col">
          <p className="font-bold">Date:</p>
          {/* setting a due date */}
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="Select Date"
            className="p-2 border rounded"
            required
          />
          {/* {showDateError && (
            <span className="block w-full p-2 text-red-600 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
              Please fill in the input field
            </span>
          )}{" "} */}
        </div>
        <button
          type='submit'
          // disabled={!todoInput.trim() || !selectedDate} //disabled when any i/p field is empty
          className="p-2 mx-2 my-4 font-bold text-white rounded bg-slate-950 "
        >
          Add Todo
        </button>
      </div>
        
      </form>
      </div>
      <div className="flex justify-around w-full p-2 mt-4 bg-teal-700">
      <ul id="List">

        {/* Check if the list is empty or contains items, then display text accordingly*/}
        <div className="block my-4 text-white bg-black p-7">
        {emptyTodoText ? (<p className="text-5xl font-extrabold text-white ">Empty Todo</p>) : <p className="text-5xl font-extrabold text-white">Added Todos</p>}
        </div>

       
          {/* iterating over the todos array, 'todo' is one item and 'index' is its index  */}
          {todos.map((todo, index) => (
            <div className="flex w-full gap-10 p-5 my-3 text-white bg-neutral-900">
            <li key={index} className="mb-2">
              <div className="flex flex-col gap-3 text-2xl ">
              {/* todo.completed ? when task completed, this classname applies a line-through style to the text*/}

              <strong className={` text-xl font-bold ${todo.completed ? "line-through" : ""}`}>
               Task name: {todo.text}
              </strong>

              {/* If todo.description exists and is not empty, the expression after && is evaluated. */}

              {todo.description && (
                <p className={`text-sm font-bold ${todo.completed ? "line-through" : ""}`}>
                  Description: {todo.description}
                </p>
              )}

              {/* .toLocaleDateString() converts a Date object into a string */}
              {todo.date && <p className="text-xs font-bold">Due Date: {todo.date.toLocaleDateString()}</p>}
              </div>
              <div className="flex flex-col gap-2 mt-2 md:flex-row ">
                {/* when clicked, triggers the deleteTodo function with the current index as an argument. This function removes the corresponding task from the todos array. */}
                <button
                  onClick={() => {
                   
                    toggleDelete(); //toggling the popup visibility=true
                  }}
                  className="w-auto px-2 py-1 mr-1 text-sm text-white bg-teal-700 rounded"
                >
                  Delete
                </button>

                {/* When edit button is clicked, this button prepares the edit form(popup) by setting the index of the task to be edited (setEditIndex) */}
                <button
                  onClick={() => (
                    // setEditIndex(index); //index of task to be edited
                    // setEditValue(todo.text); //pre-filling the task's current value
                    // setEditDescription(todo.description); //pre-filling the task's current desc
                    // setSelectedDate(todo.date); //pre-filling the currently set date
                    // toggleUpdate(); //toggling the popup visibility=true
                    setValues(index,todo.text,todo.description, todo.date))
                  }
                  className="px-2 py-1 mr-1 text-sm text-white bg-teal-700 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => completeTodo(index)}
                  className="px-1 py-1 text-sm text-white bg-teal-700 rounded"
                >
                  {todo.completed ? "undo" : "Completed"}
                </button>
              </div>
            </li>
            </div>
          ))}
        
      </ul>
      </div>

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
              className="w-full p-2 mb-2 border rounded"
            />
          </div>

          <div className="">
            <p>Edit Description:</p>
            <input
              type="text"
              placeholder="Description"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full p-2 mb-2 border rounded"
            />
          </div>

          <div className="">
            <p>Edit Date:</p>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date"
              className="w-full p-2 border rounded"
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