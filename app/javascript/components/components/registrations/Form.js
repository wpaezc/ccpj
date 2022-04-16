import React, {useState} from 'react'
import { useForm } from "react-hook-form";

const Form = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [data, setData] = useState("");
  console.log(data)
  console.log(getValues())

  return(
    <div>
      Pozo Perra
    </div>
  )
}


export default Form
