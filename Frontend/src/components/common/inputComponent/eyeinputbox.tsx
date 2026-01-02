import React, { FC, useState } from 'react'
import { Label } from 'flowbite-react'
import { FormFeedback, Input } from 'reactstrap';
import { InputType } from 'reactstrap/types/lib/Input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

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
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType: InputType = isPassword ? (show ? "text" : "password") : (type as InputType);

  return (
      <div>
          <div className="flex-1">
              <Label> {label}  {required ? <span className='text-red-500'>*</span> : ""} </Label>
              <div className="mt-1 relative">
                    <Input
                      id={id}
                      name={name}
                      className={className ? className : "bg-gray-50 border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500 dark:focus:ring-blue-500 dark:placeholder-gray-400 dark:text-white disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 focus:ring-blue-500 p-2.5 rounded-lg text-gray-900 text-sm w-full pr-10"}
                      placeholder={placeholder}
                      type={inputType ?? "text"}
                      onChange={validation?.handleChange}
                      onBlur={validation?.handleBlur}
                      value={validation?.values?.[name] || ""}
                      invalid={validation?.touched?.[name] && validation?.errors?.[name] ? true : false}
                    />

                    {isPassword && (
                      <button
                        type="button"
                        onClick={() => setShow(s => !s)}
                        aria-label={show ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300 p-1 focus:outline-none"
                      >
                        {show ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                      </button>
                    )}

                    {validation?.touched?.[name] && validation?.errors?.[name] &&
                      <FormFeedback type="invalid" className="text-Red text-sm"> {validation.errors[name]}  </FormFeedback>
                    }
              </div>
          </div>
      </div>
  )
}

export default EyeInputbox