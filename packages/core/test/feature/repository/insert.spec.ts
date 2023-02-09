import { describe, it } from 'vitest'

import { Model, useRepo } from '../../../src'
import { Attr, Str } from '../../../src/decorators'
import { assertState } from '../../helpers'

describe('feature/repository/insert', () => {
  class User extends Model {
    static entity = 'users'

    @Attr() id!: any
    @Str('') name!: string
  }

  it('inserts a record to the store', () => {
    const userRepo = useRepo(User)

    userRepo.insert({ id: 1, name: 'Elone Hoo' })

    assertState({
      users: {
        1: { id: 1, name: 'Elone Hoo' },
      },
    })
  })

  it('inserts records to the store', () => {
    const userRepo = useRepo(User)

    userRepo.insert([
      { id: 1, name: 'Elone Hoo' },
      { id: 2, name: 'Jane Doe' },
    ])

    assertState({
      users: {
        1: { id: 1, name: 'Elone Hoo' },
        2: { id: 2, name: 'Jane Doe' },
      },
    })
  })

  it('does nothing if the given data is an empty array', () => {
    const userRepo = useRepo(User)

    userRepo.insert([])
    assertState({ users: {} })
  })
})
