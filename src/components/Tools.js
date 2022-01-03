import React from 'react'

export default function Tools() {
    return (
        <div className='d-flex justify-content-between'>
            <div>
                <input type="text" placeholder='Search' className='form-control' />
            </div>
            <div>
                <select id="" className='form-control form-select'>
                    <option value="">Short</option>
                    <option value="">Date</option>
                    <option value="">Priority</option>
                </select>
            </div>
        </div>
    )
}
