import React, { useState } from 'react'
import Moment from 'react-moment';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export default function Tasklist(props) {
    // console.log(props.taskList);
    let task = {}
    let s = true;

    const [show, setShow] = useState(false);
    const [data, setData] = useState(task)
    // console.log(data);
    let date = () => (data.created_on ? (data.created_on).slice(10) : null);
    let time = () => (data.created_on ? (data.created_on).slice(-8) : null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(s);

    const changeHandler = (value, type) => {
        setData({ ...data, [type]: value, 'taskid': data.id })
    }

    const onAssignChange = (e) => {
        const [id, name] = e.target.value.split(' ')
        setData({ ...data, 'assigned_to': id, 'assigned_name': name, 'taskid': data.id })
        // setData({ ...data, 'assigned_to': id })
    }

    const datetime = () => {
        if (document.getElementById('time').value && document.getElementById('date').value) { changeHandler(document.getElementById('date').value + ' ' + document.getElementById('time').value, 'due_date') }
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Message</th>
                        <th scope="col">Assign To</th>
                        <th scope="col">Due Date</th>
                        <th scope="col">Created On</th>
                        <th scope="col">Priority</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.taskList.map((ele, i) => (
                        <tr key={i}>
                            <th scope="row">{i}</th>
                            <td>{ele.message}</td>
                            <td>{ele.assigned_name}</td>
                            <td><Moment format="DD-MM-YYYY HH:mm:ss">{ele.due_date}</Moment></td>
                            <td><Moment format="DD-MM-YYYY HH:mm:ss">{ele.created_on}</Moment></td>
                            <td>{ele.priority === "1" ? "Low" : ele.priority === "2" ? "Medium" : ele.priority === "3" ? "High" : null}</td>
                            <td>
                                <Button size="sm" className='px-3' variant="primary" onClick={() => { handleShow(s); setData(ele) }}>
                                    Edit
                                </Button>
                                <button className='btn btn-sm btn-danger' onClick={() => window.confirm("Delete ?") ? props.delTask(ele.id) : null}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal show={show} size="lg" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body className='row'>{/* message */}
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">New Task</label>
                        <textarea id="message" value={data.message} onChange={(e) => changeHandler(e.target.value, 'message')} placeholder='Message...' className='form-control' rows="2"></textarea>
                    </div>

                    {/* assign to */}
                    <div className="mb-3 col-sm-3">
                        <label htmlFor="assign" className="form-label">Assign To</label>
                        <select className='form-control form-select' id="assign" onChange={onAssignChange}>
                            <option value="">Select</option>
                            {props.users.map((ele, i) => (
                                <option key={i} value={ele.id + ' ' + ele.name}>{ele.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* priority */}
                    <div className="mb-3 col-sm-3">
                        <label htmlFor="priority" className="form-label">Priority</label>
                        <select className='form-control form-select' onChange={(e) => changeHandler(e.target.value, 'priority')} id="priority">
                            <option value="">Select</option>
                            <option value="1">Low</option>
                            <option value="2">Medium</option>
                            <option value="3">High</option>
                        </select>
                    </div>

                    {/* date */}
                    <div className="mb-3 col-sm-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id='date' onChange={datetime} />
                    </div>

                    <div className="mb-3 col-sm-3">
                        <label htmlFor="time" className="form-label">Time</label>
                        <input type="time" step="1" id='time' className="form-control" onChange={datetime} />
                    </div></Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { props.updateData(data) }}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>


        </div >
    )
}
