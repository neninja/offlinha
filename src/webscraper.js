const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');

const linhasUrls = [
  {
    numero: "2601",
    url: 'http://www.vivasulpoa.com.br/linha?id=51',
    tratamento: 'bccb'
  },
  {
    numero: "289",
    url: 'http://www.vivasulpoa.com.br/linha?id=108',
    tratamento: 'bttb'
  },
  {
    numero: "289",
    url: 'http://www.vivasulpoa.com.br/linha?id=110',
    tratamento: 'bccb'
  }
]

function tratamentoGenerico(c, selectors){
  let getTds = (selector, obj) => {
    return Array.from(c(selector)).map(td => ({
      ...obj,
      horario: c(td).text().trim()
    }))
  }

  let horarios = [
    ...getTds(selectors[0], {
      dia: "dias úteis",
      operacao: "inverno",
      rota: "p1p2"
    }),
    ...getTds(selectors[1], {
      dia: "sabado",
      operacao: "inverno",
      rota: "p1p2"
    }),
    ...getTds(selectors[2], {
      dia: "domingo",
      operacao: "inverno",
      rota: "p1p2"
    }),
    ...getTds(selectors[3], {
      dia: "dias úteis",
      operacao: "verão",
      rota: "p1p2"
    }),
    ...getTds(selectors[4], {
      dia: "sabado",
      operacao: "verão",
      rota: "p1p2"
    }),
    ...getTds(selectors[5], {
      dia: "domingo",
      operacao: "verão",
      rota: "p1p2"
    }),
    ...getTds(selectors[6], {
      dia: "dias úteis",
      operacao: "inverno",
      rota: "p2p1"
    }),
    ...getTds(selectors[7], {
      dia: "sabado",
      operacao: "inverno",
      rota: "p2p1"
    }),
    ...getTds(selectors[8], {
      dia: "domingo",
      operacao: "inverno",
      rota: "p2p1"
    }),
    ...getTds(selectors[9], {
      dia: "dias úteis",
      operacao: "verão",
      rota: "p2p1"
    }),
    ...getTds(selectors[10], {
      dia: "sabado",
      operacao: "verão",
      rota: "p2p1"
    }),
    ...getTds(selectors[11], {
      dia: "domingo",
      operacao: "verão",
      rota: "p2p1"
    })
  ]

  return horarios
}

function tratamentoBCCB(c){
  return tratamentoGenerico(
    c,
    [
      '#uteisibc table td',
      '#sabadoibc table td',
      '#domingoibc table td',
      '#uteisvbc table td',
      '#sabadovbc table td',
      '#domingovbc table td',
      '#uteisicb table td',
      '#sabadoicb table td',
      '#domingoicb table td',
      '#uteisvcb table td',
      '#sabadovcb table td',
      '#domingovcb table td',
    ]
  )
}

function tratamentoBTTB(c){
  return tratamentoGenerico(
    c,
    [
      '#uteisibt table td',
      '#sabadoibt table td',
      '#domingoibt table td',
      '#uteisvbt table td',
      '#sabadovbt table td',
      '#domingovbt table td',
      '#uteisitb table td',
      '#sabadoitb table td',
      '#domingoitb table td',
      '#uteisvtb table td',
      '#sabadovtb table td',
      '#domingovtb table td',
    ]
  )
}

async function getFromUrl(url, tratamento){
  const AxiosInstance = axios.create();

  const response = await AxiosInstance.get(url)
  const html = response.data
  const $ = cheerio.load(html)

  let titulo = $('h2').text()

  if(titulo){
    let tituloAr = titulo.split("Mapa da Rota")
    titulo = tituloAr[0]
    titulo = titulo.trim()

    numero = titulo.split(" ")[1]
  }

  let horarios = []
  let rotasLabel = []

  if(tratamento === 'bccb'){
    horarios = tratamentoBCCB($)
    rotasLabel =[
      "Bairro / Centro",
      "Centro / Bairro",
    ]
  } else {
    horarios = tratamentoBTTB($)
    rotasLabel =[
      "Bairro / Terminal",
      "Terminal / Bairro",
    ]
  }

  return {
    titulo,
    numero,
    rotasLabel,
    horarios,
  }
}

async function main(){
  let linhas = []

  for(let i = 0; i < linhasUrls.length; i++){
    linhas.push(await getFromUrl(linhasUrls[i].url, linhasUrls[i].tratamento))
  }

  let data = JSON.stringify(linhas, null, 2);
  let filepath = path.resolve(__dirname, 'linhas.json')
  fs.writeFile(filepath, data, (err) => {
    if (err) throw err;
  });
}

main()
