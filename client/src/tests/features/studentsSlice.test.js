
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { setupStore } from '../../app/store'
import {fetchStudents} from '../../features/StudentsList/studentsSlice'

const students = [
    {
        "student_id": 1,
        "first_name": "John",
        "last_name": "Smith",
        "check_in_time": "2023-09-04T07:56:51.451Z"
    },
    {
        "student_id": 2,
        "first_name": "student 2",
        "last_name": "last name",
        "check_in_time": "2023-09-04T07:57:03.223Z"
    }
]
export const handlers = [
  rest.get('http://localhost:8000/index', (req, res, ctx) => {
    return res(ctx.json(students), ctx.delay(150))
  })
]

const server = setupServer(...handlers)


describe('students redux state tests', () => {
  it('Should initially students list to an empty Array', () => {
    const state = setupStore().getState().students
    expect(state.students).toEqual([])
  })
})

describe('Games redux state tests', () => {
  // Enable API mocking before tests.
beforeEach(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

  it('Should be able to fetch the students list', async () => {
    const store  = setupStore()
    const result = await store.dispatch(fetchStudents())
    const students = result.payload

    expect(result.type).toBe('students/fetchStudents/fulfilled')
    expect(students[0].student_id).toEqual(1)

    const state = store.getState().students
    expect(state.students).toEqual(students)
  })
})