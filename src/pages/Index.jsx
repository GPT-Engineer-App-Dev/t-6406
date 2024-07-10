import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const handleAddTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, newTodo]);
    setNewTodo("");
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index]);
  };

  const handleSaveTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = editingText;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText("");
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Todo App</h1>
      </header>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Add Todo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="New Todo"
            />
            <Button onClick={handleAddTodo}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Todo List</CardTitle>
        </CardHeader>
        <CardContent>
          {todos.length === 0 ? (
            <p className="text-center text-gray-500">No todos yet.</p>
          ) : (
            <ul className="space-y-4">
              {todos.map((todo, index) => (
                <li key={index} className="flex justify-between items-center">
                  {editingIndex === index ? (
                    <div className="flex gap-2 w-full">
                      <Input
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                        className="flex-grow"
                      />
                      <Button onClick={() => handleSaveTodo(index)}>Save</Button>
                    </div>
                  ) : (
                    <>
                      <span>{todo}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleEditTodo(index)}>
                          Edit
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteTodo(index)}>
                          Delete
                        </Button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;