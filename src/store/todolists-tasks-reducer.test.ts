import {TaskStateType, TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {AddTodoListsAC, todolistsReducer} from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodolistsState: Array<TodoListType> = [];

    const action = AddTodoListsAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action) //{"qqq": []}
    const endTodolistsState = todolistsReducer(startTodolistsState, action) // [id: "qqq", title: "new todolist", filter: "All"]

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
});
