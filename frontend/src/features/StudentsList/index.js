import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Cell, HeaderCell, Message} from "../atoms";
import { fetchStudents } from './studentsSlice'
import {formatDate} from '../../utils/date'

const StudentsList = () => {

    const dispatch = useDispatch()

    const {status, error, students} = useSelector((state) => state.students)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchStudents())
        }
    }, [status, students, dispatch])

    if (status === 'loading') {
        return <Message color="positive" message="Loading..." />
    } 
    if (status === 'error') {
        return <Message color="negative" message={error} />
    }

  const colTitles = {
    first_name: "First name",
    last_name: "Last name",
    check_in_time: "Check in time",
  };
  const columns = Object.keys(colTitles);
  const getColTitle = (col) => {
    return colTitles[col];
  };

  if (!students?.length) {
    return <Message color="negative" message="No user" />
  }
    
  // Render
  return (
    <div>
      <div className="main-header"> Students List </div>
      <table>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <HeaderCell key={i} title={getColTitle(col)} />
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map(row => (
            <tr key={row.student_id} data-testid="student">
              {columns.map((col, j) => <Cell key={`${row.student_id}-${j}`} content={col === 'check_in_time' ? formatDate(new Date(row[col])) : row[col]} />)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentsList;
