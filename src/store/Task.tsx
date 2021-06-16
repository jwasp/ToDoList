import React, {ChangeEvent} from "react";
import {CheckBox, Delete} from "@material-ui/icons";
import {Checkbox, IconButton} from "@material-ui/core";
import {TaskType} from "./AppWithRedux";
import EditableSpan from "../EditableSpan";
import {changeTaskStatusAC} from "./tasks-reducer";


type TaskPropsType = {
    task: TaskType
    todolistID: string
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
}
export const Task = React.memo(({task, todolistID, changeTaskStatus}) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus()
    }

    return (
        <div className={task.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                onChange={onChangeHandler}
                checked={task.isDone}
            />
            <EditableSpan title={task.title} changeTitle={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )

})