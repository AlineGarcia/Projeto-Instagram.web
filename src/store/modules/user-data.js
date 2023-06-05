import axios from 'axios'

const urlBase = 'https://localhost:44330/api'

const state = {
    perfil: {}
}

const mutations = {
    atualizarPerfil: (state, obj) => {
        state.perfil = obj
    }
}

const actions = {
    async obterPerfil(state, obj) {
        let perfilId = obj.id
        let result = await axios.get(urlBase+'/perfil/obter-por-id/'+`${perfilId}`)
        .then(resp => {
            console.log('resposta ====>', resp)
            return resp.data
        })
        return result
    }
}


export default {
    namespaced: true,
    root: true,
    state, 
    mutations,
    actions
}