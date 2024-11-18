const listUserBox = document.querySelector('.list-box')
const inputSearchBox = document.querySelector('.input[name="searchCliente"]')

async function searchAllUsers() {
    const response = await fetch('http://localhost:3000/user/all', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
    const data = await response.json()
    if (data.messsage) {
        alert('Erro: ' + data.messsage)
    }
    const actualDay = new Date()
    for (let i = 0; i < data[0].length; i++) {
        const dataNasc = new Date(data[0][i].DataNasc)
        listUserBox.innerHTML += `<div class="item">
                        <p>Nome: ${data[0][i].name}</p>
                        <p>idade: ${
                            actualDay.getFullYear() - dataNasc.getFullYear()
                        }</p>
                        <p>CPF: ${data[0][i].CPF}</p>
                        <hr />
                        <div class="buttons">
                            <button class="btn">Relatório Semanal</button>
                            <button class="btn">Relatório Geral</button>
                            <div>
                                <button class="btn btn-warning">Editar</button>
                                <button class="btn btn-danger">
                                    Apagar
                                </button>
                            </div>
                        </div>
                    </div>`
    }
}

function filtrarPorCPF(lista, cpf) {
    return lista.filter((item) => {
        const nameMin = searchInput.value
        const searchMin = item.CPF
        return searchMin.includes(cpf)
    })
}

const searchInput = document.querySelector('input[name="searchCliente"]')
const searchBtn = document.querySelector('.searchBtn')

searchBtn.onclick = async () => {
    const response = await fetch('http://localhost:3000/user/all', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
    const data = await response.json()
    if (data.messsage) {
        alert('Erro: ' + data.messsage)
    }
    listUserBox.innerHTML = ''
    const users = filtrarPorCPF(data[0], searchInput.value)
    console.log(users)
    const actualDay = new Date()
    for (let i = 0; i < users.length; i++) {
        const dataNasc = new Date(users[i].DataNasc)
        listUserBox.innerHTML += `<div class="item">
                        <p>Nome: ${users[i].name}</p>
                        <p>idade: ${
                            actualDay.getFullYear() - dataNasc.getFullYear()
                        }</p>
                        <p>CPF: ${users[i].CPF}</p>
                        <hr />
                        <div class="buttons">
                            <button class="btn">Relatório Semanal</button>
                            <button class="btn">Relatório Geral</button>
                            <div>
                                <button class="btn btn-warning">Editar</button>
                                <button class="btn btn-danger">
                                    Apagar
                                </button>
                            </div>
                        </div>
                    </div>`
    }
}

searchAllUsers('')
