import {Col, Table, Form, Button, Alert} from 'react-bootstrap';
import { iconDelete, iconEdit } from '../icons';
import { useState } from 'react';
import dayjs from 'dayjs';
import {Link, Redirect, useLocation} from 'react-router-dom';

function ExamScores(props) {
  return (
    <Col>
      <ExamTable exams={props.exams} courses={props.courses} deleteExam={props.deleteExam}/>
    </Col>
  );
}

function ExamTable(props) {
  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Exam</th>
            <th>Score</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          props.exams.map((ex) => <ExamRow key={ex.code}
            exam={ex}
            examName={props.courses.filter(c => c.code === ex.code)[0].name}
            deleteExam={props.deleteExam}
          />)
          }
        </tbody>
      </Table>
      <Link to="/add"><Button variant='success'>Add</Button></Link>
    </>
  );
}

function ExamRow(props) {
  return <tr><ExamRowData exam={props.exam} examName={props.examName}/><RowControl exam={props.exam} deleteExam={props.deleteExam}/></tr>;
}

function ExamRowData(props) {
  return (<>
      <td>{props.examName}</td>
      <td>{props.exam.score}</td>
      <td>{props.exam.date.format('DD/MM/YYYY')}</td>
    </>
  );
}

function RowControl(props) {
  return <td>
    <Link to={{
      pathname: "/update",
      state: {exam: props.exam, examDate: props.exam.date.format('YYYY-MM-DD') }
      }}>{iconEdit}</Link>
    <span onClick={() => props.deleteExam(props.exam.code)}>{iconDelete}</span>
  </td>;
}

function ExamForm(props) {
  const location = useLocation();
  const [course, setCourse] = useState(location.state ? location.state.exam.code : '');
  const [score, setScore] = useState(location.state ? location.state.exam.score : 30);
  const [date, setDate] = useState(location.state ? location.state.examDate : dayjs().format('YYYY-MM-DD'));
  const [errorMessage, setErrorMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const exam = {code: course, score: score, date: dayjs(date)};
    // SOME VALIDATION, ADD MORE!!!
    let valid = true;
    if(course === '' || score === '')
        valid = false;
    const scorenumber = +score ;
    if(scorenumber < 18 || scorenumber > 31)
        valid = false;
    
    if(valid)
    {
      props.addOrUpdateExam(exam);
      setSubmitted(true);
    }
    else {
      // show a better error message...
      setErrorMessage('Error(s) in the form, please fix it.')
    }
  }

  return(
    <>{submitted ? <Redirect to="/"/> :
    <Form>
      {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
      <Form.Group controlId='selectedCourse'>
        <Form.Label>Course</Form.Label>
        <Form.Control as='select' defaultValue='' value={course} onChange={event => setCourse(event.target.value)} disabled={location.state}>
          <option value='' hidden disabled>Choose one...</option>
          { props.courses.map(course => 
          <option key={course.code} value={course.code}>
            {course.name}
          </option>) }
        </Form.Control>
      </Form.Group>

      <Form.Group controlId='selectedScore'>
        <Form.Label>Score</Form.Label>
        <Form.Control type="number" min={18} max={31} value={score} onChange={event => setScore(event.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId='selectedDate'>
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" value={date} onChange={event => setDate(event.target.value)} />
      </Form.Group>

      <Button type='submit' onClick={handleSubmit}>Save</Button> <Link to="/"><Button variant='secondary'>Cancel</Button></Link>
      
    </Form>}</>
  )
}

export {ExamScores, ExamForm};