# Offlinha

PWA com os horários de alguns ônibus de Porto Alegre/RS.

## Utilização

Acesse [neni.dev/offlinha](http://neni.dev/offlinha) com google chrome

## Desenvolvimento

### Setup

- Baixe as dependências ``yarn``

### Run

- Inicie o servidor ``yarn start``

### Test

- Teste ``yarn test``

## Atualização da base de ônibus

- Rode o web scraper com ``yarn ws``
- Commite a modificação do `linhas.json`

## Objetivos

- [x] Pesquisar ônibus
- [x] Filtrar horários (dia e operação)
- [x] Selecionar dia atual como default 
- [x] Nem todos ônibus vão até o centro, corrigir o layout e/ou fim da linha do ônibus
- [ ] Possibilitar baixar o app para uso offline mas com a estratégia "network first"
- [ ] Identificar qual estação do ano exibir os horários
- [ ] Permitir que sejam feitas anotações nos horários
- [ ] Permitir que possa ser anotado "qual lado do ônibus possui sol"
- [ ] Permitir exportar anotações e "lado de sol no ônibus"
- [ ] Permitir importar anotações e "lado de sol no ônibus"
