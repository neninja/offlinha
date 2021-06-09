import {
  Header,
  Grid,
} from 'semantic-ui-react'

interface Horario {
  dia: string
  operacao: string
  rota: string
  horario: string
}

interface ListaResultadosProps {
  rotaLabelP1P2: string
  rotaLabelP2P1: string
  horarios: Horario[]
}

export function ListaResultados({ rotaLabelP1P2, rotaLabelP2P1, horarios }: ListaResultadosProps) {
  return (
    <>
      <Header as='h2'>{rotaLabelP1P2}</Header>

      <Grid textAlign='center' doubling columns={5}>
        {horarios
          .filter(h => h.rota === "p1p2")
          .map((h, i) => (
          <Grid.Column key={i}>
            {h.horario}
          </Grid.Column>
        ))}
      </Grid>

      <Header as='h2'>{rotaLabelP2P1}</Header>

      <Grid textAlign='center' doubling columns={5}>
        {horarios
          .filter(h => h.rota === "p2p1")
          .map((h, i) => (
          <Grid.Column key={i}>
            {h.horario}
          </Grid.Column>
        ))}
      </Grid>
    </>
  )
}
