

export type Screen =
  | 'home'
  | 'map'
  | 'location'
  | 'briefing'
  | 'puzzle'

export interface Location {
  id: number
  name: string
  description: string
  objective: string
  unlocked: boolean
}
