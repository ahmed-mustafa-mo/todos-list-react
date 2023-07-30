import React, { useState } from 'react';

const AddTodo = ({addTodo}) => {
    const [title, setTitle] = useState('')

    const onSubmit = (e) => {
        e.preventDefault();
        addTodo(title);
        setTitle(''); 
    }

    const onChange = (e) => setTitle(e.target.value);
        return ( 
            <form onSubmit={onSubmit} style={{ display: 'flex' }}>
                <input type="text" name="title" placeholder="Add Todo..." style={{ flex: '10', padding:'5px' }} value={title} onChange={onChange}/>
                <input type="submit" value="Submit" className="btn" style={{ flex: '1' }}/>
            </form>
         );
}
 
export default AddTodo;