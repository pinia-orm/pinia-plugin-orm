export type Element = Record<string, any>

export interface Elements {
  [id: string]: Element
}

export interface NormalizedData {
  [entity: string]: Elements
}
