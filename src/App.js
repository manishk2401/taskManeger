import './App.css';
import Taskform from './components/Taskform';
import Tasklist from './components/Tasklist';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Token from './components/Token';
import Tools from './components/Tools';

function App() {
  const [users, setUsers] = useState([])
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://devza.com/tests/tasks/listusers',
      headers: { 'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a' }
    })
      .then(function (response) {
        // console.log(response.data.users);
        setUsers(response.data.users)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    axios({
      method: 'get',
      url: 'https://devza.com/tests/tasks/list',
      headers: { 'AuthToken': 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a' }
    })
      .then(function (response) {
        // console.log(response.data.tasks);
        setTasks(response.data.tasks)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  const addTask = (data) => {
    setTasks([...tasks, data])
    // console.log(data);
    let key = Object.keys(data)
    let value = Object.values(data)

    let formData = new FormData()

    key.map((ele, i) => ele !== "assigned_name" || ele !== "created_on" ? formData.append(ele, value[i]) : null)
    // console.log(formData);

    axios.post('https://devza.com/tests/tasks/create', formData, {
      headers: {
        "AuthToken": 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
      }
    })
      .then(response => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const delTask = (id) => {
    const filteredTasks = tasks.filter((item) => item.id !== id);
    // console.log(filteredTasks);
    setTasks(filteredTasks)

    let formData = new FormData()
    formData.append('taskid', id)

    axios.post('https://devza.com/tests/tasks/delete', formData, {
      headers: {
        "AuthToken": 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
      }
    })
      .then(response => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updTask = (data) => {
    console.log(data);
    let newSet = tasks
    newSet.map((item, index) => {
      if (item.id === data.id) {
        newSet[index] = data;
      }
      return item
    })
    setTasks(newSet)

    let key = Object.keys(data)
    let value = Object.values(data)

    let formData = new FormData()

    key.map((ele, i) => ele !== "assigned_name" || ele !== "id" ? formData.append(ele, value[i]) : ele !== "id" ? formData.append('taskid', value[i]) : null)
    console.log(formData);

    axios.post('https://devza.com/tests/tasks/update', formData, {
      headers: {
        "AuthToken": 'UrM4YHgb1FcqEf1tuKwmAMMX5MxFZ12a'
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  return (
    <>
      <div className="container my-4">
        <h3>Task Management</h3>
        <Taskform data={tasks} users={users} onAddData={addTask} />
        <h5 className='my-3 border-bottom pb-2'>Task List</h5>
        {/* <Tools /> */}
        <Tasklist taskList={tasks} users={users} delTask={delTask} updateData={updTask} />
      </div>


    </>
  );
}

export default App;
