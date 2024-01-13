import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'

import { Home } from '.'
import userEvent from '@testing-library/user-event'

describe('<Home  />', () => {
  it('should, render search, posts and load more', async () => {
    const { debug } = render(<Home />)
    const noMorePosts = screen.getByText('Nao existem posts')

    expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)
    expect(search).toBeInTheDocument()

    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(2)

    const button = screen.getByRole('button', { name: /load more posts/i })
    expect(button).toBeInTheDocument()

    debug()
  })

  it('should search for posts', async () => {
    const { debug } = render(<Home />)
    const noMorePosts = screen.getByText('Nao existem posts')

    // expect.assertions(3)

    await waitForElementToBeRemoved(noMorePosts)

    const search = screen.getByPlaceholderText(/type your search/i)
    expect(
      screen.getByRole('heading', {
        name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit 1',
      }),
    ).toBeInTheDocument
    expect(screen.getByRole('heading', { name: 'qui est esse 2' })).toBeInTheDocument
    expect(screen.queryByRole('heading', { name: 'sunt aut facere repellat provident occa' })).not.toBeInTheDocument()

    userEvent.type(search, 'sunt aut')
    expect(
      screen.getByRole('heading', {
        name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit 1',
      }),
    ).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'qui est esse 2' })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Search Value: sunt aut' })).toBeInTheDocument()

    userEvent.clear(search)
    expect(
      screen.getByRole('heading', {
        name: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit 1',
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'qui est esse 2' })).toBeInTheDocument()
    debug()
  })
})
