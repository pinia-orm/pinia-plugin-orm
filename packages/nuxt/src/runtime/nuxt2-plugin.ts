import { createORM } from 'pinia-plugin-orm'
import { ormOptions } from '#build/orm-options'

export default function (ctx: any) {
  ctx.$pinia.use(createORM(ormOptions))
}
