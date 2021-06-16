import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {AddBox, Delete} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    console.log("AddItemForm")

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    };

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("Title is required")
        }
        setTitle("")

    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) {
            setError(null)
        }
        if(e.key === "Enter"){
            onClickAddItem()
        }
    }


    return(
        <div>
            <TextField
                variant={"outlined"}
                error={!!error}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                label={"Title"}
                helperText={error && "Title is required!"}
                size={"small"}

            />

            <IconButton onClick={onClickAddItem} color={"primary"}>
                <AddBox/>
            </IconButton>

        </div>
    )
})

export default AddItemForm;