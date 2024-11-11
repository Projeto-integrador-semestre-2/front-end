const createBtn = document.querySelector('.create-btn')
const cpf = document.querySelector('input[name="cpf"]')
const username = document.querySelector('input[name="name"]')
const password = document.querySelector('input[name="password"]')
const dataNasc = document.querySelector('input[name="dataNasc"]')
const cargo = document.querySelector('select[name="cargo"]')
const celular = document.querySelector('input[name="celular"]')
const peso = document.querySelector('input[name="peso"]')

createBtn.onclick = async () => {
    const response = await fetch('http://localhost:3000/user/', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({
            CPF: cpf.value,
            name: username.value,
            password: password.value,
            DataNasc: dataNasc.value,
            Cargo: cargo.value,
            Celular: celular.value,
            Peso: parseFloat(peso.value),
        }),
    })
    const data = await response.json()
    if (data.message) return alert('Erro: ' + data.message)
    alert('Usuário criado com sucesso')
    window.location.href = './listUser.html'
}
