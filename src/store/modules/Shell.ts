type ThemeName = 'light' | 'dark'
interface IShellStore {
  theme: ThemeName
}

const state: IShellStore = {
  theme: 'dark',
}

// Mutations are the ONLY guys that can change (mutate) the state directly
const mutations = {}

// Actions are publicly available for everyone to call
// They can handle async and long run such as AJAX
// They should NOT mutate the state directly but commit a mutation
const actions = {}

const getters = {}

export default {
  actions,
  getters,
  mutations,
  state,
  namespaced: true,
}
