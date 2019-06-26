let nodeBairroCentro = document.getElementById("bairroCentro");
let nodeCentroBairro = document.getElementById("centroBairro");

let selectOnibus = document.getElementById("numero");

let radioEstacoes = document.querySelectorAll('input[name="estacao"]');
let radioDias = document.querySelectorAll('input[name="dia"]');
let date = new Date();

document.addEventListener("DOMContentLoaded", function(event) {
    let linhas = Object.keys(onibus);
    for(linha of linhas){
        let option = document.createElement("option");
        option.value = linha;
        option.innerHTML = linha;
        selectOnibus.appendChild(option);
    }

    // Marca radio de dia da semana
    let diaDaSemana = date.getDay();
    if(diaDaSemana <= 5){
        radioDias[0].checked = true;
    } else if(diaDaSemana = 6){
        radioDias[1].checked = true;
    } else {
        radioDias[2].checked = true;
    }
});
selectOnibus.addEventListener("change", atualizaListaDeHorarios)

/*
 * eventlisteners radio box
 */
for (radioEstacao of radioEstacoes) radioEstacao.addEventListener("click", atualizaListaDeHorarios);

for (radioDia of radioDias) radioDia.addEventListener("click", atualizaListaDeHorarios);

function atualizaListaDeHorarios(){
    nodeBairroCentro.innerHTML = "";
    nodeCentroBairro.innerHTML = "";

    let numeroOnibus = selectOnibus.value;
    let estacaoAno = document.querySelector('input[name="estacao"]:checked').value;
    let diaSemana = document.querySelector('input[name="dia"]:checked').value;

    if (numeroOnibus != ""){
        let horarios = onibus[numeroOnibus].horarios[estacaoAno][diaSemana];
        for(horario of horarios.bairro){
            let li = document.createElement("li");
            li.innerHTML = horario;
            nodeBairroCentro.appendChild(li);
        }

        for(horario of horarios.centro){
            let li = document.createElement("li");
            li.innerHTML = horario;
            nodeCentroBairro.appendChild(li);
        }
    }

}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function(reg) {
            console.log('Service worker Registered');
        })
        .catch(function (err) {
            console.log('erro', err);
        });
}
