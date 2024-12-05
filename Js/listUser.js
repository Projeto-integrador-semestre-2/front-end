const listUserBox = document.querySelector('.list-box')
const inputSearchBox = document.querySelector('.input[name="searchCliente"]')

async function searchAllUsers() {
    const response = await fetch(
        'http://localhost:3000/check/relatorio_completo',
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        }
    )
    const data = await response.json()
    if (data.messsage) {
        alert('Erro: ' + data.messsage)
    }
    for (let i = 0; i < data[0].length; i++) {
        let classificacao = 'Iniciante'
        if (
            data[0][i].total_hours_overall >= 6 &&
            data[0][i].total_hours_overall <= 10
        )
            classificacao = 'Intermediário'
        if (
            data[0][i].total_hours_overall >= 11 &&
            data[0][i].total_hours_overall <= 20
        )
            classificacao = 'Avançado'
        if (data[0][i].total_hours_overall >= 20)
            classificacao = 'Extremamente avançado'
        listUserBox.innerHTML += `<div class="item">
                        <p>Nome: ${data[0][i].name}</p>
                        <p>CPF: ${data[0][i].CPF}</p>
                        <p>Horas na semana: ${data[0][i].total_hours_weekly}</p>
                        <p>Horas totais: ${data[0][i].total_hours_overall}</p>
                        <p>Classificação: ${classificacao}</p>
                        <hr />
                        <div class="buttons">
                        Detalhado
                            <button class="btn" onclick="relatorioSemanal(${data[0][i].CPF})">Relatório Semanal</button>
                            <button class="btn" onclick="relatorioGeral(${data[0][i].CPF})">Relatório Geral</button>
                            <div>
                                
                               
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

async function relatorioSemanal(cpf) {
    const response = await fetch(
        'http://localhost:3000/check/relatorio_semanal',
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                cpf: cpf,
            }),
        }
    )
    const data = await response.json()
    if (data.messsage) {
        alert('Erro: ' + data.messsage)
    } else {
        let classificacao = 'Iniciante'
        if (data.hours >= 6 && data.hours <= 10) classificacao = 'Intermediário'
        if (data.hours >= 11 && data.hours <= 20) classificacao = 'Avançado'
        if (data.hours >= 20) classificacao = 'Extremamente avançado'
        alert(
            `Quantidade de horas nesta semana: ${data.hours || '00'}:${
                data.minutes || '00'
            }:${data.seconds || '00'}\nClassificado como: ${classificacao}`
        )
    }
}

async function relatorioGeral(cpf) {
    const response = await fetch(
        'http://localhost:3000/check/relatorio_geral',
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                cpf: cpf,
            }),
        }
    )
    const data = await response.json()
    if (data.messsage) {
        alert('Erro: ' + data.messsage)
    } else {
        let classificacao = 'Iniciante'
        if (data.hours >= 6 && data.hours <= 10) classificacao = 'Intermediário'
        if (data.hours >= 11 && data.hours <= 20) classificacao = 'Avançado'
        if (data.hours >= 20) classificacao = 'Extremamente avançado'
        alert(
            `Quantidade de horas nesta semana: ${data.hours || '00'}:${
                data.minutes || '00'
            }:${data.seconds || '00'}\nClassificado como: ${classificacao}`
        )
    }
}

const searchInput = document.querySelector('input[name="searchCliente"]')
const searchBtn = document.querySelector('.searchBtn')

searchBtn.onclick = async () => {
    const response = await fetch(
        'http://localhost:3000/check/relatorio_completo',
        {
            headers: { 'Content-Type': 'application/json' },
            method: 'GET',
        }
    )
    const data = await response.json()
    if (data.messsage) {
        alert('Erro: ' + data.messsage)
    }
    listUserBox.innerHTML = ''
    const users = filtrarPorCPF(data[0], searchInput.value)
    const actualDay = new Date()
    for (let i = 0; i < users.length; i++) {
        let classificacao = 'Iniciante'
        if (
            data[0][i].total_hours_overall >= 6 &&
            data[0][i].total_hours_overall <= 10
        )
            classificacao = 'Intermediário'
        if (
            data[0][i].total_hours_overall >= 11 &&
            data[0][i].total_hours_overall <= 20
        )
            classificacao = 'Avançado'
        if (data[0][i].total_hours_overall >= 20)
            classificacao = 'Extremamente avançado'
        listUserBox.innerHTML += `<div class="item">
                        <p>Nome: ${data[0][i].name}</p>
                        <p>CPF: ${data[0][i].CPF}</p>
                        <p>Horas na semana: ${data[0][i].total_hours_weekly}</p>
                        <p>Horas totais: ${data[0][i].total_hours_overall}</p>
                        <p>Classificação: ${classificacao}</p>
                        <hr />
                        <div class="buttons">
                        Detalhado
                            <button class="btn" onclick="relatorioSemanal(${data[0][i].CPF})">Relatório Semanal</button>
                            <button class="btn" onclick="relatorioGeral(${data[0][i].CPF})">Relatório Geral</button>
                            <div>
                                
                               
                            </div>
                        </div>
                    </div>`
    }
}

searchAllUsers('')
