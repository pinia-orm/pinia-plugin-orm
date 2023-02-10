import { Model } from 'pinia-plugin-orm'

export default class Todo extends Model {
  static entity = 'todos'

  static fields() {
    return {
      id: this.uid(),
      title: this.string(''),
      userId: this.attr(null),
    }
  }
}
