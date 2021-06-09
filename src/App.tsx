import React, { useState } from 'react';

import {
  Container,
  Header,
  Icon,
  Divider,
} from 'semantic-ui-react'
import { FormularioFiltro } from './components/FormularioFiltro'
import { ListaResultados } from './components/ListaResultados'

interface Horario {
  dia: string
  operacao: string
  rota: string
  horario: string
}

function App() {
  const [ rotasLabel, setRotasLabel ] = useState(["Bairro / Centro", "Centro / Bairro"])
  const [ horarios, setHorarios ] = useState([] as Horario[])

  return (
    <Container>
      <Divider hidden />

      <Header as='h1'>Offlinha <Icon name='bus' /></Header>

      <FormularioFiltro
        setHorarios={setHorarios}
        setRotasLabel={setRotasLabel}
      />


      <Divider hidden />

      <ListaResultados 
        rotaLabelP1P2={rotasLabel[0]}
        rotaLabelP2P1={rotasLabel[1]}
        horarios={horarios}
      />

    </Container>
  );
}

export default App;
