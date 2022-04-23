import React, {Fragment, useState} from 'react'
import { useForm } from "react-hook-form";

const ParticipantForm = ({participant, index, updateParticipant}) => {
  const updateValue = (type, e) => {
    new_participant = {...participant}
    new_participant[type] = e.target.value

    updateParticipant(index, new_participant)
  }

  return(
    <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
			<div className="font-medium text-base">
        DATOS PERSONALES DEL PARTICIPANTE Nº{index + 1}
      </div>
			<div className="grid grid-cols-12 gap-4 gap-y-5 mt-5">
				<div className="intro-y col-span-12 sm:col-span-6">
					<label className="form-label">Apellido paterno</label>
					<input onChange={(e) => updateValue('apellido_paterno', e)} value={participant.apellido_paterno} name="apellido_paterno" type="text" className="form-control" placeholder="Apellido paterno" />
				</div>
				<div className="intro-y col-span-12 sm:col-span-6">
					<label className="form-label">Apellido materno</label>

					<input onChange={(e) => updateValue('apellido_materno', e)} value={participant.apellido_materno} name="apellido_materno" type="text" className="form-control" placeholder="Apellido materno" />
				</div>
				<div className="intro-y col-span-12 sm:col-span-6">
					<label className="form-label">Nombres</label>

					<input onChange={(e) => updateValue('nombres', e)} value={participant.nombres} name="nombres" type="text" className="form-control" placeholder="Nombres" />
				</div>

				<div className="intro-y col-span-12 sm:col-span-6">
					<label className="form-label">DNI / NIT</label>

					<input onChange={(e) => updateValue('document_identidad', e)} value={participant.document_identidad} name="document_identidad" type="text" className="form-control" placeholder="Nombres" />
				</div>
				<div className="intro-y col-span-12 sm:col-span-6">
					<label className="form-label">Correo</label>

					<input onChange={(e) => updateValue('correo', e)} value={participant.correo} name="correo" type="text" className="form-control" placeholder="Correo" />
				</div>
				<div className="intro-y col-span-12 sm:col-span-6">
					<label className="form-label">Celular</label>

					<input onChange={(e) => updateValue('celular', e)} value={participant.celular} name="celular" type="text" className="form-control" placeholder="Celular" />
				</div>

				<div className="intro-y col-span-12 sm:col-span-6">
					<label className="form-label">Pais</label>
					<input onChange={(e) => updateValue('pais', e)} value={participant.pais} name="pais" type="text" className="form-control" placeholder="Pais" />
				</div>
		  </div>
		</div>
  )
}

export default ParticipantForm
