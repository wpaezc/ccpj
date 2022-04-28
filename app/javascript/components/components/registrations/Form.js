import React, {Fragment, useState} from 'react'
import { useForm } from "react-hook-form";
import uuid from 'react-uuid'

import ParticipantForm from './ParticipantForm'
import Attachments from './Attachments'
import { ToastContainer, toast } from 'react-toastify'

import axios from 'axios'
const csrf_token = document.querySelector('meta[name="csrf-token"]')['content']
axios.defaults.headers.post['X-CSRF-TOKEN'] = csrf_token
axios.defaults.headers.put['X-CSRF-TOKEN'] = csrf_token

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
  const [form_uuid, setFormUuid] = useState(uuid())
  const { register, handleSubmit, watch } = useForm();
  const [processing, setProcessing] = useState(false)

  const onSubmit = (data) => {
    if(processing) {
      return
    }

    let any_missing = participantes.find((p) => {
      return !(p.apellido_paterno && p.apellido_materno && p.nombres && p.document_identidad && p.celular && p.correo && p.pais)
    })

    if (any_missing) {
      toast.error("Completa primero todos los campos de los anteriores participantes", {
        position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })

      return
    }

    if(files.length == 0) {
      toast.error("Debe subir al menos un comprobante de pago", {
        position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })
      return
    }

    setProcessing(true)

    axios.post(`/api/registrations`, {form_uuid: form_uuid, general_data: data, files: files, participantes: participantes}).then((response) => {
      toast.success("Registro correcto", {
        position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })

      setInterval(() => {
        window.location = `/registrations/${response.data.registration.uuid}`
      }, 2000);
    })
  }

  const tipo_de_comprobante = watch('tipo_de_comprobante')
  const categoria = watch('categoria')

  const [files, setFiles] = useState([])
  
  const [participantes, setParticipants] = useState([
    {...baseParticipant}
  ])

  const addNewParticipant = () => {
    let any_missing = participantes.find((p) => {
      return !(p.apellido_paterno && p.apellido_materno && p.nombres && p.document_identidad && p.celular && p.correo && p.pais)
    })
    if (any_missing) {
      toast.error("Completa primero todos los campos de los anteriores participantes", {
        position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      })

      return
    }

    new_participant = {...baseParticipant}
    new_participants = [...participantes, new_participant]
    setParticipants(new_participants)
  }

  const updateParticipant = (index, new_participant) => {
    new_participants = [...participantes]
    new_participants.splice(index, 1, new_participant)

    setParticipants(new_participants)
  }

  const addFiles = (file) => {
    setFiles([...files, file])
  }

  return(
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
          <div className="font-medium text-base">
            Registros generales
          </div>

          <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
            <div className="intro-y col-span-12 sm:col-span-6">
              <label>COMPROBANTE DE PAGO</label>

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
								<button onClick={addNewParticipant} className="btn btn-outline-secondary w-36 inline-block mr-1 mb-2">
                  <span>+ Agregar participante</span>
                </button>
							</div>


              <div className="px-5 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
                <div className="font-medium text-base">
                  COMPROBANTE DE PAGO
                </div>

                <div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                  <div className="intro-y col-span-12 sm:col-span-12">
                    <Attachments 
                      resource_type={"registrations"}
                      resource_id={form_uuid}
                      addFiles={addFiles}
                    />
                  </div>
                </div>
              </div>

							<div className="intro-y col-span-12 flex items-center justify-center sm:justify-center mt-5">
                <input type="submit" value="Finalizar registro" className="btn btn-primary w-48 inline-block mr-1 mb-2" />
							</div>

            </Fragment>
          }
        </div>
      </form>
      <ToastContainer />
    </Fragment>
  )
}


export default Form
