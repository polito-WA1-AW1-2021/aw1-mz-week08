import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row } from 'react-bootstrap';
import dayjs from 'dayjs';
import AppTitle from './components/AppTitle';
import { ExamScores } from './components/ExamComponents';

const fakeExams = [
  {code: '01TYMOV', score: 28, date: dayjs('2021-03-01')},
  {code: '01SQJOV', score: 29, date: dayjs('2021-06-03')},
  {code: '04GSPOV', score: 18, date: dayjs('2021-05-24')},
  {code: '01TXYOV', score: 24, date: dayjs('2021-06-21')}
];

const fakeCourses = [
  {code: '01TYMOV', name: 'Information systems security'},
  {code: '02LSEOV', name: 'Computer architectures'},
  {code: '01SQJOV', name: 'Data Science and Database Technology'},
  {code: '01OTWOV', name: 'Computer network technologies and services'},
  {code: '04GSPOV', name: 'Software Engineering'},
  {code: '01TXYOV', name: 'Web Applications I'},
  {code: '01NYHOV', name: 'System and device programming'},
  {code: '01TYDOV', name: 'Cloud Computing'},
  {code: '01SQPOV', name: 'Software Networking'},
];

function App() {

  return (
    <Container className="App">
      <AppTitle />
      <Row>
        <ExamScores exams={fakeExams} courses={fakeCourses}/>
      </Row>
    </Container>
  );
}

export default App;
