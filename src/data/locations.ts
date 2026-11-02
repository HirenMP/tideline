
import type { Location } from '../types/game'

export const locations: Location[] = [
  {
    id: 1,
    name: 'The Sunken Gate',
    description:
      'An ancient entrance lies beneath the forgotten waters.',
    objective:
      'Restore the water pathway and awaken the ancient gate.',
    unlocked: true,
  },
  {
    id: 2,
    name: 'The Whispering Aqueduct',
    description:
      'A forgotten network of channels winds through the valley.',
    objective:
      'Restore the ancient aqueduct and uncover its purpose.',
    unlocked: false,
  },
  {
    id: 3,
    name: 'The Silent Reservoir',
    description:
      'A mysterious reservoir rests beyond the ancient bridge.',
    objective:
      'Discover the secret hidden beneath the reservoir.',
    unlocked: false,
  },
]
