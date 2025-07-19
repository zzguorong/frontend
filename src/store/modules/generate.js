const state = {
  generationParams: {}
}

const mutations = {
  // 保存生成参数到 state
  setGenerationParams(state, payload) {
    state.generationParams ={...payload}
    console.log('保存的参数:', state.generationParams)
  }
}

// 如果需要 actions 或 getters，可按需补充

export default {
  // 启用命名空间，组件通过 generation/setGenerationParams 提交
  namespaced: true,
  state,
  mutations
}
  