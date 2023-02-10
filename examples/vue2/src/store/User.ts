import { Model } from 'pinia-plugin-orm'
import Todo from './Todo.js'

export default class User extends Model {
  static entity = 'users'

  static fields() {
    return {
      id: this.uid(),
      name: this.string(''),
      avatarImgUrl: this.string(''),
      firstName: this.string(''),
      lastName: this.string(''),
      todos: this.hasMany(Todo, 'userId'),
    }
  }
}
