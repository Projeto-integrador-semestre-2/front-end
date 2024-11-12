const listUserBox = document.querySelector('.list-box')
const inputSearchBox = document.querySelector('.input[name="searchCliente"]')

async function searchAllUsers(search) {
    const response = await fetch('http://localhost:3000/user/all', {
        headers: { 'Content-Type': 'application/json' },
        method: 'GET',
    })
    const data = await response.json()
    console.log(data)
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
                                    Desativar
                                </button>
                            </div>
                        </div>
                    </div>`
    }
}

searchAllUsers('')
