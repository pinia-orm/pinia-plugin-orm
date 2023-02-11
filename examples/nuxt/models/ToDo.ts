import { Model } from 'pinia-plugin-orm'
import { Attr, Str } from 'pinia-plugin-orm/dist/decorators'
import { Uid } from 'pinia-plugin-orm/dist/packages/uuid/v4'

export default class ToDo extends Model {
  static entity = 'todos'

  @Uid() declare id: string
  @Attr(null) declare user_id: string | number
  @Str('Todo Text') declare title: string
  @Str('Todo Name') declare name: string
}
