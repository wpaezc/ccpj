import React, { Fragment } from 'react'
import ReactDOM from 'react-dom/client'

import Form from '../components/registrations/Form'

const RegistrationsContainer = () => {
  return(
    <Form />
  )
}

if (document.getElementById("registrations")) {
  const root = ReactDOM.createRoot(document.getElementById("registrations"));

  root.render(
    <React.StrictMode>
      <RegistrationsContainer />
    </React.StrictMode>
  )
}
