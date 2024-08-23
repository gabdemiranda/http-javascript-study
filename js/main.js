import ui from "./ui.js"
import api from "./api.js"

document.addEventListener("DOMContentLoaded", () => {
  ui.renderizarPensamentos()

  const formPensamento = document.querySelector("#pensamento-form")
  formPensamento.addEventListener("submit", manipularSubmissaoForm)

  const botaoCancelar = document.querySelector("#botao-cancelar")
  botaoCancelar.addEventListener("click", manipularCancelamento)
})

async function manipularSubmissaoForm(event) {
  event.preventDefault()
  const id = document.querySelector("#pensamento-id").value
  const conteudo = document.querySelector("#pensamento-conteudo").value
  const autoria = document.querySelector("#pensamento-autoria").value

  try {
    if(id) {
      await api.editarPensamento({ id, conteudo, autoria })
    } else {
      await api.salvarPensamento({ conteudo, autoria })
    }
    ui.renderizarPensamentos()
    manipularCancelamento()
  } catch {
    alert("Erro ao salvar pensamento")
  }
}

function manipularCancelamento() {
  ui.limparForm()
}