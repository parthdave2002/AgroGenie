import React, { FC } from 'react'
import { Label } from 'flowbite-react'
import { FormFeedback, Input } from 'reactstrap';
import { InputType } from 'reactstrap/types/lib/Input';

interface EyeInputProps {
    id: string;
    name : string;
    label ?: string;
    required ?: boolean;
    placeholder : string;
    type : InputType;
    validation ?: any; 
    className ?: string;
}

const EyeInputbox:FC <EyeInputProps> = ({ label, required, className, id, name, placeholder = "", type = "text", validation}) => {

  return (
      <div>
          <div className="flex-1">
              <Label> {label}  {required ? <span className='text-red-500'>*</span> : ""} </Label>
              <div className="mt-1">
                    <Input
                      id={id}
                      name={name}
                      className={className ? className : "bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full"}
                      placeholder={placeholder}
                      type={type ?? "text"}
                      onChange={validation.handleChange}
                      onBlur={validation.handleBlur}
                      value={validation.values[name] || ""}
                      invalid={validation.touched[name] && validation.errors[name] ? true : false}
                    />
                    {validation.touched[name] && validation.errors[name] &&
                      <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors[name]}  </FormFeedback>
                    }
              </div>
          </div>
      </div>
  )
}

export default EyeInputbox