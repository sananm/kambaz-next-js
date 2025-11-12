"use client";
import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { Todo } from "./types";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const TODOS_API = `${HTTP_SERVER}/lab5/todos`;

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState<Todo>({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    completed: false,
  });

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a id="wd-retrieve-todos" className="btn btn-primary" href={TODOS_API}>
        Get Todos
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <a
        id="wd-retrieve-todo-by-id"
        className="btn btn-primary float-end"
        href={`${TODOS_API}/${todo.id}`}
      >
        Get Todo by ID
      </a>
      <FormControl
        id="wd-todo-id"
        type="number"
        value={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <hr />
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`${TODOS_API}?completed=true`}
      >
        Get Completed Todos
      </a>
      <hr />
      <h4>Creating new Items in an Array</h4>
      <a
        id="wd-create-todo"
        className="btn btn-primary"
        href={`${TODOS_API}/create`}
      >
        Create Todo
      </a>
      <hr />
      <h4>Deleting from an Array</h4>
      <a
        id="wd-delete-todo-with-id-1"
        className="btn btn-primary float-end"
        href={`${TODOS_API}/1/delete`}
      >
        Delete Todo with ID = 1
      </a>
      <FormControl
        type="number"
        value={todo.id}
        className="w-50"
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <hr />
      <h4>Updating an Item in an Array</h4>
      <a
        href={`${TODOS_API}/${todo.id}/title/${todo.title}`}
        className="btn btn-primary float-end"
      >
        Update Todo
      </a>
      <FormControl
        type="number"
        value={todo.id}
        className="w-25 float-start me-2"
        onChange={(e) => setTodo({ ...todo, id: parseInt(e.target.value) })}
      />
      <FormControl
        value={todo.title}
        className="w-50 float-start"
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <br />
      <br />
      <hr />
    </div>
  );
}
