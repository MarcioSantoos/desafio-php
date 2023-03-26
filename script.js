
const selectValue = document.getElementById("paises");
selectValue.addEventListener("change", buscarDadosApi);

function buscarDadosApi(event) {
    const selectOption = event.target.value;

    let tabela = document.getElementById('table');
    if (tabela.tBodies[0] !== undefined) {
        let tbody = document.getElementById('tbody');
        tbody.parentNode.removeChild(tbody);
        let thead = document.getElementById('thead');
        thead.parentNode.removeChild(thead);
    }

    if (selectOption !== '') {
        fetch(`https://dev.kidopilabs.com.br/exercicio/covid.php?pais=${selectOption}`)
            .then(response => response.json())
            .then(data => {
                let thead = document.createElement('thead');
                thead.id = 'thead';
                let tr = document.createElement('tr');
                let thEstado = document.createElement('th');
                thEstado.appendChild(document.createTextNode('Estado'));
                let thMortes = document.createElement('th');
                thMortes.appendChild(document.createTextNode('Mortes'));
                let thConfirmados = document.createElement('th');
                thConfirmados.appendChild(document.createTextNode('Confirmados'));
                tr.appendChild(thEstado);
                tr.appendChild(thMortes);
                tr.appendChild(thConfirmados);
                thead.appendChild(tr);
                tabela.appendChild(thead);
                let tbody = document.createElement('tbody');
                tbody.id = 'tbody';
                for (let element in data) {
                    let tr = document.createElement('tr');
                    let estado = document.createElement('td');
                    let mortos = document.createElement('td');
                    let confirmados = document.createElement('td');

                    estado.textContent = data[element].ProvinciaEstado;
                    mortos.textContent = data[element].Mortos;
                    confirmados.textContent = data[element].Confirmados;

                    tr.appendChild(estado);
                    tr.appendChild(mortos);
                    tr.appendChild(confirmados);
                    tbody.appendChild(tr)
                }
                tabela.appendChild(tbody);
            }).catch(err => console.log('Erro de solicitação', err));
    }

}

function saveDate(event) {
    if (event !== '') {
        const data = new Date();

        const dataString = data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate() + ' ' + data.getHours() + ':' + data.getMinutes() + ':' + data.getSeconds();

        let dados = {
            pais: document.getElementById("paises").value,
            data: dataString,
        }
        fetch("./backend/bdsave.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        })
            .then(response => response.text())
            .catch(error => console.error(error));

        getAcesso();
    }
}

function getAcesso() {
    let footer = document.querySelector('footer');

    if (document.querySelector('footer p') !== null) {
        document.querySelector('footer p#acesso').remove();
        document.querySelector('footer p#pais').remove();
    }

    fetch("./backend/getaccess.php", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.json())
        .then(data => {
            let acesso = document.createElement('p');
            acesso.id = 'acesso';
            let pais = document.createElement('p');
            pais.id = 'pais';

            let date = new Date(data.acesso);
            let dataFormatada = + date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

            acesso.appendChild(document.createTextNode('Último acesso em: ' + dataFormatada));
            pais.appendChild(document.createTextNode('País consultado: ' + data.pais));

            footer.appendChild(acesso);
            footer.appendChild(pais);
        })
        .catch(error => console.error(error));

}

