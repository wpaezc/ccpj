import React, {Fragment, useState} from 'react'
import { useForm } from "react-hook-form";

import ParticipantForm from './ParticipantForm'

const baseParticipant = {
  apellido_paterno: '',
  apellido_materno: '',
  nombres: '',
  document_identidad: '',
  celular: '',
  correo: '',
  pais: '',
}

const Form = () => {
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => console.log(data);
  const tipo_de_comprobante = watch('tipo_de_comprobante')
  const categoria = watch('categoria')
  
  const [participantes, setParticipants] = useState([
    {...baseParticipant}
  ])

  const addNewParticipant = () => {
    new_participant = {...baseParticipant}
    new_participants = [...participantes, new_participant]
    setParticipants(new_participants)
  }

  const updateParticipant = (index, new_participant) => {
    new_participants = [...participantes]
    new_participants.splice(index, 1, new_participant)

    setParticipants(new_participants)
  }

  console.log(participantes)

  return(
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
          <div className="font-medium text-base">
            Registros generales
          </div>

          <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
            <div className="intro-y col-span-12 sm:col-span-6">
              <label>CONPROBANTE DE PAGO</label>

              <div className="flex flex-col sm:flex-row mt-2">
                <div className="form-check mr-2 mt-2">

                  <input {...register("tipo_de_comprobante")} id="boleta" className="form-check-input" type="radio" name="tipo_de_comprobante" value="boleta" />
                  <label className="form-check-label" htmlFor="boleta">Boleta</label>

                </div>
                <div className="form-check mr-2 mt-2">
                  <input {...register("tipo_de_comprobante")} id="factura" className="form-check-input" type="radio" name="tipo_de_comprobante" value="factura" />
                  <label className="form-check-label" htmlFor="factura">Factura</label>
                </div>
              </div>
            </div>

            <div className="intro-y col-span-12 sm:col-span-6">
              <label htmlFor="ruc" className="form-label">RUC</label>
              <input
                disabled={tipo_de_comprobante != 'factura'}
                id="ruc" {...register("ruc")}
                name="ruc" type="text" className="form-control" placeholder="RUC" />
            </div>
          </div>

          <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
            <div className="intro-y col-span-12 sm:col-span-6">
              <label>CATEGORIA</label>

              <div className="flex flex-col sm:flex-row mt-2">
                <div className="form-check mr-2 mt-2">

                  <input {...register("categoria")} id="pleno" className="form-check-input" type="radio" name="categoria" value="pleno" />
                  <label className="form-check-label" htmlFor="pleno">Pleno</label>

                </div>
                <div className="form-check mr-2 mt-2">
                  <input {...register("categoria")} id="estudiante" className="form-check-input" type="radio" name="categoria" value="estudiante" />
                  <label className="form-check-label" htmlFor="estudiante">Estudiante</label>
                </div>
              </div>
            </div>
          </div>

          { tipo_de_comprobante && categoria &&
            <Fragment>
              { participantes.map((participant, index) => {
                return(
                  <ParticipantForm 
                    index={index}
                    key={index}
                    participant={participant}
                    updateParticipant={updateParticipant}
                  />
                )
              })}

							<div className="intro-y col-span-12 flex items-center justify-center sm:justify-center mt-5">
								<button onClick={addNewParticipant} className="btn btn-primary w-24 ml-2">
                  Agregar participante
                </button>
							</div>

            </Fragment>
          }
        </div>
      </form>

    </Fragment>
  )
}


export default Form
