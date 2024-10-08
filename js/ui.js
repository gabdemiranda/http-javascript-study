import api from "./api.js"

const ui = {

  async preencherForm(pensamentoId) {
    const pensamento = await api.buscarPensamentoPorId(pensamentoId)
    document.querySelector("#pensamento-id").value = pensamento.id
    document.querySelector("#pensamento-conteudo").value = pensamento.conteudo
    document.querySelector("#pensamento-autoria").value = pensamento.autoria
  },

  async renderizarPensamentos() {
    const listaPensamentos = document.querySelector('#lista-pensamentos')
    const mensagemVazia = document.querySelector("#mensagem-vazia")
    listaPensamentos.innerHTML = ""

    try {
      const pensamentos = await api.buscarPensamentos()
      if (pensamentos.length === 0) {
        mensagemVazia.classList.remove("hidden")
      } else {
        mensagemVazia.classList.add("hidden")
        pensamentos.forEach(ui.adicionarPensamentoNaLista)
      }
    } catch {
      alert('Erro ao renderizar pensamentos')
    }
  },

  adicionarPensamentoNaLista(pensamento) {
    const listaPensamentos = document.querySelector("#lista-pensamentos")
    const li = document.createElement("li")
    li.setAttribute("data-id", pensamento.id)
    li.classList.add("li-pensamento")

    const iconeAspas = document.createElement("img")
    iconeAspas.src = "assets/imagens/aspas-azuis.png"
    iconeAspas.alt = "Aspas azuis"
    iconeAspas.classList.add("icone-aspas")

    const pensamentoConteudo = document.createElement("div")
    pensamentoConteudo.textContent = pensamento.conteudo
    pensamentoConteudo.classList.add("pensamento-conteudo")

    const pensamentoAutoria = document.createElement("div")
    pensamentoAutoria.textContent = pensamento.autoria
    pensamentoAutoria.classList.add("pensamento-autoria")

    const botaoEditar = document.createElement("button")
    botaoEditar.classList.add("botao-editar")
    botaoEditar.onclick = () => ui.preencherForm(pensamento.id)

    const iconeEditar = document.createElement("img")
    iconeEditar.src = "assets/imagens/icone-editar.png"
    iconeEditar.alt = "Editar"
    iconeEditar.classList.add("icone-editar")
    botaoEditar.appendChild(iconeEditar)

    const botaoExcluir = document.createElement("button")
    botaoExcluir.classList.add("botao-excluir")
    botaoExcluir.onclick = async () => {
      try {
        await api.excluirPensamento(pensamento.id)
        ui.renderizarPensamentos
      } catch (error) {
        alert("Erro ao excluir pensamento")
      }
    }

    const iconeExcluir = document.createElement("img")
    iconeExcluir.src = "assets/imagens/icone-excluir.png"
    iconeExcluir.alt = "Excluir"
    iconeExcluir.classList.add("icone-excluir")
    botaoExcluir.appendChild(iconeExcluir)

    const icones = document.createElement("div")
    icones.classList.add("icones")
    icones.appendChild(botaoEditar)
    icones.appendChild(botaoExcluir)

    li.appendChild(iconeAspas)
    li.appendChild(pensamentoConteudo)
    li.appendChild(pensamentoAutoria)
    li.appendChild(icones)
    listaPensamentos.appendChild(li)
  },

  limparForm() {
    document.querySelector("#pensamento-form").reset()
  }
}

export default ui