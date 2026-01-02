import React, { FC } from 'react'
import { FormFeedback } from 'reactstrap';
import { Label } from "flowbite-react";
import Select from "react-select";

interface Option {
  label: string;
  value: string | number;
}

interface SelectInputProps {
    id: string;
    name: string;
    label?: string;
    required?: boolean;
    placeholder: string;
    options: Option[];
    validation?: any;
    onChange?: (selectedOption: Option | null) => void;
    value?: Option | null;
    className?: string;
}


const Selectinput : FC<SelectInputProps> = ({ id, name,  label,  required, placeholder = "Select option",  options,  validation,  onChange,  value, className,}) => {
  return (
      <div className="flex-1  mt-[1rem]">
            <Label> {label}  {required ? <span className='text-red-500'>*</span> : ""} </Label>
          <div className="mt-1">
              <Select  
                  className="w-full dark:text-white"
                  classNames={{
                      control: () => "react-select__control",
                      singleValue: () => "react-select__single-value",
                      menu: () => "react-select__menu",
                      option: ({ isSelected }) =>
                          isSelected ? "react-select__option--is-selected" : "react-select__option",
                      placeholder: () => "react-select__placeholder",
                  }}
                 
                  onChange={(selectedOption) => {
                      validation?.setFieldValue(name, selectedOption?.value || "");
                      if (onChange) onChange(selectedOption);
                  }}
                   placeholder={placeholder}
                  value={value}
                  options={options}
                  isClearable={true}
              />
              {validation?.touched[name] && validation?.errors[name] && (  <FormFeedback type="invalid" className="text-Red text-sm mt-1 block" > {validation.errors[name] as string}</FormFeedback>)}
          </div>
      </div>
  )
}

export default Selectinput