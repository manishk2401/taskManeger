import React, { useState } from 'react'

export default function Taskform(props) {
    // console.log(props.users);
    const [data, setData] = useState({})
    // let addTask = () => {
    //     alert('Submit');
    // }

    const changeHandler = (value, type) => {
        setData({ ...data, [type]: value })
    }

    const onAssignChange = (e) => {
        const [id, name] = e.target.value.split(' ')
        setData({ ...data, 'assigned_to': id, 'assigned_name': name, 'created_on': new Date().toJSON() })
        // setData({ ...data, 'assigned_to': id })
    }

    const datetime = () => {
        if (document.getElementById('time').value && document.getElementById('date').value) { changeHandler(document.getElementById('date').value + ' ' + document.getElementById('time').value, 'due_date') }
    }


    return (
        <div className='row border rounded p-3' style={{ backgroundColor: "#e1e1e1" }}>
            {/* message */}
            <div className="mb-3">
                <label htmlFor="message" className="form-label">New Task</label>
                <textarea id="message" onChange={(e) => changeHandler(e.target.value, 'message')} placeholder='Message...' className='form-control' rows="2"></textarea>
            </div>

            {/* assign to */}
            <div className="mb-3 col-md-3">
                <label htmlFor="assign" className="form-label">Assign To</label>
                <select className='form-control form-select' id="assign" onChange={onAssignChange}>
                    <option value="">Select</option>
                    {props.users.map((ele, i) => (
                        <option key={i} value={ele.id + ' ' + ele.name}>{ele.name}</option>
                    ))}
                </select>
            </div>

            {/* priority */}
            <div className="mb-3 col-md-3">
                <label htmlFor="priority" className="form-label">Priority</label>
                <select className='form-control form-select' onChange={(e) => changeHandler(e.target.value, 'priority')} id="priority">
                    <option value="">Select</option>
                    <option value="1">Low</option>
                    <option value="2">Medium</option>
                    <option value="3">High</option>
                </select>
            </div>

            {/* date */}
            <div className="mb-3 col-md-2">
                <label htmlFor="date" className="form-label">Date</label>
                <input type="date" className="form-control" id='date' onChange={datetime} />
            </div>

            <div className="mb-3 col-md-2">
                <label htmlFor="time" className="form-label">Time</label>
                <input type="time" step="1" id='time' className="form-control" onChange={datetime} />
            </div>
            <button type="submit" className=" col-md-2 btn btn-primary" style={{ height: "fit-content", marginTop: "30px" }} onClick={() => { data.message && data.assigned_to && data.priority && data.due_date ? props.onAddData(data) : alert('All Fields are Mandatory') }}>Add Task</button>
        </div >
    )
}
