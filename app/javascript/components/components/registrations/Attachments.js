import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'

import Dropzone from 'react-dropzone'

import axios from 'axios'
const csrf_token = document.querySelector('meta[name="csrf-token"]')['content']
axios.defaults.headers.post['X-CSRF-TOKEN'] = csrf_token
axios.defaults.headers.delete['X-CSRF-TOKEN'] = csrf_token

import AttachmentFiles from './AttachmentFiles'

export default class Attachments extends Component {
  constructor(props) {
    super(props)
    this.state = {
      files: [],
      max_files: props.max_files || 3,
      multiple: true,
      loading: false,
    }

    this.onDrop = this.onDrop.bind(this)
  }

  onDrop(files) {
    let current_files = this.state.files

    if((files.length + current_files.length) <= this.state.max_files) {
      let files_map = files.map((file) => {
        return Object.assign(
          file,
          {
            preview: URL.createObjectURL(file),
            uploaded: false,
            uuid: Math.random().toString(36).substring(9),
            extension: file.name.split('.').pop()
          }
        )
      })

      files_map = files_map.filter(e => e.size/1024/1224 <= 10.0)


      let files_data = files_map.map(file => {
        return {name: file.name, uuid: file.uuid, extension: file.extension, type: file.type, size: file.size/1024/1024 }
      })

      let params = {
        resource_type: this.props.resource_type,
        resource_id: this.props.resource_id,
        files: files_data || []
      }

      axios.get(`/api/registrations/signed_urls`, {params: params}).then((response) => {
        let data = response.data.signed_urls

        files_map = files_map.map((file) => {
          let upload_data = data[file.uuid]
          return Object.assign(file, {...upload_data})
        })

        this.setState({files: files_map.concat(current_files)})
      })
    }
  }

  render() {
    let { files, max_files, multiple } = this.state

    return(
      <Fragment>
        { files.length < max_files &&
          <Dropzone
            className="dropzone py-4 mb-2 cursor-pointer"
            multiple={multiple}
            onDrop={this.onDrop}>
            <center className="text-blue-600/0 cursor-pointer">
              <span className="font-weight-bold">Selecciona 3 archivos tipo imagen o PDF de máximo 10MB cada uno.</span>
            </center>
          </Dropzone>
        }

        <AttachmentFiles 
          files={this.state.files}
          resource_type={this.props.resource_type}
          resource_id={this.props.resource_id}
          updateInputValue={this.props.addFiles}
        />
      </Fragment>
    )
  }
}
