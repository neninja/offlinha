import React, { useState, useEffect, SyntheticEvent } from 'react';

import {
  Icon,
  Form,
  Dropdown,
  DropdownProps,
  Radio,
  RadioProps,
  Checkbox,
  CheckboxProps,
  Grid,
} from 'semantic-ui-react'
import store from '../../linhas.json'

interface Horario {
  dia: string
  operacao: string
  rota: string
  horario: string
}

interface Linha {
  titulo: string
  numero: string
  rotasLabel: string[]
  horarios: Horario[]
}

interface FormularioFiltroProps {
  setHorarios: (h: Horario[]) => void
  setRotasLabel: (h: string[]) => void
}

export function FormularioFiltro({ setHorarios, setRotasLabel }: FormularioFiltroProps) {
  const linhasDisponiveis = store.map((linha: Linha) => ({
    value: linha.numero,
    text: `${linha.numero}: ${linha.titulo}`,
  }))

  const [ numeroLinhaSelecionada, setNumeroLinhaSelecionada ] = useState("")
  const [ diaSelecionado, setDiaSelecionado ] = useState("")
  const [ operacaoSelecionada, setOperacaoSelecionada ] = useState("inverno")

  useEffect(() => {
    let diaDaSemana = new Date().getDay();
    if(diaDaSemana <= 5){
      setDiaSelecionado("dias úteis")
    } else if(diaDaSemana === 6){
      setDiaSelecionado("sabado")
    } else {
      setDiaSelecionado("domingo")
    }
  }, [])

  useEffect(() => {
    let linha = store.find(l => l.numero === numeroLinhaSelecionada)

    if(linha){
      let horarios = linha.horarios.filter(h => (
        h.operacao === operacaoSelecionada && h.dia === diaSelecionado
      ))

      setHorarios(horarios)
    }
  }, [numeroLinhaSelecionada, operacaoSelecionada, diaSelecionado, setHorarios])

  useEffect(() => {
    let linha = store.find(l => l.numero === numeroLinhaSelecionada)

    if(linha){
      setRotasLabel(linha.rotasLabel)
    }
  }, [numeroLinhaSelecionada, setRotasLabel])

  function handleLinha(e: SyntheticEvent, { value }: DropdownProps){
    setNumeroLinhaSelecionada(String(value))
  }

  function handleDia(e: SyntheticEvent, { value }: RadioProps){
    setDiaSelecionado(String(value))
  }

  function handleOperacao(e: SyntheticEvent, { checked }: CheckboxProps){
    setOperacaoSelecionada(checked ? "inverno" : "verão")
  }

  return (
      <Form>
        <Form.Field>

          {/* 
            * Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of RefFindNode which is inside StrictMode.
            * https://github.com/reactjs/react-transition-group/issues/429
            */}
          <Dropdown
            placeholder='Selecione a linha'
            fluid
            search
            selection
            onChange={handleLinha}
            options={linhasDisponiveis}
          />
        </Form.Field>

        <Grid textAlign='center' columns={3} stackable>
          <Grid.Column>
            <Form.Group inline textAlign='center'>
            <Form.Field>
              <Radio
                label="Dias úteis"
                value="dias úteis"
                checked={diaSelecionado === "dias úteis"}
                onChange={handleDia}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Sábado"
                value="sabado"
                checked={diaSelecionado === "sabado"}
                onChange={handleDia}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                label="Domingo"
                value="domingo"
                checked={diaSelecionado === "domingo"}
                onChange={handleDia}
              />
            </Form.Field>
            </Form.Group>
          </Grid.Column>
          <Grid.Column>
            <Form.Group inline>
              <Form.Field>
                <Icon name="sun" color="orange" />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  toggle
                  checked={operacaoSelecionada === "inverno"}
                  onChange={handleOperacao}
                />
              </Form.Field>
              <Form.Field>
                <Icon name="snowflake" color="blue" />
              </Form.Field>
            </Form.Group>
          </Grid.Column>
        </Grid>
      </Form>
  )
}
