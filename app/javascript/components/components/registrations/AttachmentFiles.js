import React, { Component, Fragment } from 'react'
import { render } from 'react-dom'

import { Line } from 'rc-progress'
import { FaFile } from 'react-icons/fa';
import axios from 'axios'
const csrf_token = document.querySelector('meta[name="csrf-token"]')['content']
axios.defaults.headers.post['X-CSRF-TOKEN'] = csrf_token
axios.defaults.headers.put['X-CSRF-TOKEN'] = csrf_token

const thumbInner = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  cursor: 'pointer',
  height: '180px',
  marginTop: '10px'
}

const img = {
  maxWidth: '100%',
  height: 'auto'
};

const i_style = {
  fontSize: '80px',
  color: 'grey',
  height: '100%',
  width: 'auto',
  padding: '10px'
};

const file_card_style = {
  background: '#fff',
    transition: '.5s',
    border: '0',
    position: 'relative',
    width: '100%',
    boxShadow: 'none',
    marginBottom: '10px'
}


const delete_button = {
  position: 'absolute',
  margin: '3px',
  fontSize: '0.475rem',
  color: 'white',
  padding: '0.25rem 0.45rem',
  lineHeight: '1.2',
  zIndex: 2
}

const isImage = (extension) => {
  return(["png", "gif", "jpeg", "jpg","heic"].includes((extension || "").toLowerCase()))
}

const isNotViewableInBrowser = (extension) => {
  return (!["png", "gif","jpeg", "jpg","pdf"].includes((extension || "").toLowerCase()))
}

export default class AttachmentFiles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }

  render() {
    const { photoIndex, isOpen} = this.state;
    let { small_view } = this.props
    let image_files = []
    let other_files = []
    let images = []
    let titles = []
    let class_name = 'intro-y grid grid-cols-12 gap-3 sm:gap-6 mt-5'
    
    this.props.files.forEach((f) => {
      if(isImage(f.extension)) {
        image_files.push(f)
        let file_url = f.file_url
        if(f.processed_image) {
          file_url = f.extra_url.optimized
        }
        images.push(file_url || f.preview)
        titles.push(<p className='mt-2'>{f.name}</p>)
      } else {
        other_files.push(f)
      }
    })

    let no_label = this.props.field_type == 'file' ? 'NO FILES' : 'NO IMAGES'

    return(
      <div className={class_name}>
        { image_files.map((file, index) => {
          return (
              <FileThumb
                key={file.uuid || index}
                file={file}
                resource_type={this.props.resource_type}
                resource_id={this.props.resource_id}
                onImageClick={() => this.setState({isOpen: true, photoIndex: index})}
                updateInputValue={this.props.updateInputValue} 
                small_view={small_view}
                can_delete_attachment={this.props.can_delete_attachment}
                remove_file={this.props.remove_file}
              />
          )
        })}
        { other_files.map((file, index) => {
          return (
              <FileThumb
                key={file.uuid || index} 
                file={file}
                resource_type={this.props.resource_type}
                resource_id={this.props.resource_id}
                small_view={small_view}
                can_delete_attachment={this.props.can_delete_attachment}
                remove_file={this.props.remove_file}
              />
          )
        })}

        { this.props.files.length == 0 && this.props.comes_from_campodata_form &&
          <div className='mx-3' style={{width: '100%', border: '1px solid #e5e6eb', borderRadius: '2px'}}>
            <center className='py-4 text-muted small'>
              {no_label}
            </center>
          </div>
        }

      </div>
    )
  }
}

class FileThumb extends React.Component {
  constructor(props) {
    super(props)
    let { file } = this.props
    
    this.state = {
      uploaded_percentage: 0,
      uploaded: false,
      created_at_label: file.created_at_label,
      user: file.user,
    }
  }

  componentDidMount() {
    let {file} = this.props
    if(!file.uploaded) {
      let headers = {
        'Content-Type': file.type
      }
     
      if(isNotViewableInBrowser(file.extension)) {
        headers = {
          'Content-Type': 'binary/octet-stream',
          'Content-Disposition': 'attachment'
        }
      } 
      let options = {
        headers: headers,
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
          this.setState({uploaded_percentage: percentCompleted})
        }
      }

      axios.put(file.upload_url, file, options).then((response) => {
        let data = {
          resource_type: this.props.resource_type,
          resource_id: this.props.resource_id,
          file: file
        }

        axios.post(`/api/registrations/attachments`, data).then((response) => {
          let file_data = response.data.data ? response.data.data.attributes : {}
          this.setState({id: file_data.id, uploaded: true, created_at_label: file_data.created_at_label, user: file_data.user}, () => {
            if(this.props.updateInputValue) {
              this.props.updateInputValue(file_data)
            }
          })
        })
      })
    }
  }

  render() {
    let {file, small_view, can_delete_attachment} = this.props
    let uploaded = file.uploaded || this.state.uploaded

    let icon = 'fa fa-file-o'

    if(file.extension == 'pdf' || file.document_type == 'pdf' || file.document_type == 'pdf_form') {
      icon = 'fa fa-file-pdf-o'
    }
    if(file.extension == 'docx' || file.document_type == 'word' || file.document_type == 'docx') {
      icon = 'fa fa-file-word-o'
    }

    let thumb = {...thumbInner}

    
    let is_image = isImage(file.extension)
    let image_url = file.preview || file.file_url

    if(small_view && !is_image) {
      thumb.height = '4px'
    }

    if(is_image && file.processed_image) {
      image_url = file.extra_url.thumb
    }

    let { created_at_label, user } = this.state

    return(
      <div className="intro-y col-span-6 sm:col-span-4 md:col-span-4 2xl:col-span-4" style={file_card_style}>  
        { !is_image ? (
          <div style={thumb}>
            <a target="_blank" href={file.preview || file.file_url} alt={file.name}>
            { !small_view && 
              <FaFile size="50px"/>
            }
            </a>
          </div>
        ) : (
          <div style={thumb} onClick={this.props.onImageClick}>
            <img
              src={image_url}
              style={img}
            />
          </div>
        )}
        { !uploaded &&
          <Line percent={this.state.uploaded_percentage} strokeWidth="4" trailColor="#D3D3D3" strokeColor="#2db7f5" />
        }

        <small className='mt-2'>
          <center>
            <a target="_blank" className="text-info" href={file.preview || file.file_url} alt={file.name}>
              {file.name}
            </a>
          </center>
        </small>
      </div>
    )
  }
}
