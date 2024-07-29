import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import '@testing-library/jest-dom'
import { fireEvent, screen } from '@testing-library/react'
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from '../test-utils'
import StudentsList from '../../features/StudentsList'

// We use msw to intercept the network request during the test,
// and return the response students list after 150ms
// when receiving a get request to the `http://localhost:8000/index` endpoint
export const handlers = [
  rest.get('http://localhost:8000/index', (req, res, ctx) => {
    return res(ctx.json([
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
]), ctx.delay(150))
  })
]

const server = setupServer(...handlers)

// Enable API mocking before tests.
beforeAll(() => server.listen())

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers())

// Disable API mocking after the tests are done.
afterAll(() => server.close())

test('empty studens list', async () => {
  renderWithProviders(<StudentsList />, { preloadedState : {students: {}}})

  expect(screen.queryByText(/no user/i)).toBeInTheDocument()
})


test('fetches & receives a studens list', async () => {
  renderWithProviders(<StudentsList />)


  expect(await screen.queryByText(/Loading\.\.\./i)).toBeInTheDocument()
  expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()


  // after some time, the user should be received
  expect(await screen.findByText(/John/i)).toBeInTheDocument()
  expect(screen.queryByText(/no user/i)).not.toBeInTheDocument()
  expect(screen.queryByText(/Loading\.\.\./i)).not.toBeInTheDocument()


  expect(screen.getAllByTestId('student').length).toBe(2)
})