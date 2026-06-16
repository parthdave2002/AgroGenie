import React, { FC } from 'react'
import { FaSearch } from 'react-icons/fa';
import { Button, Input, InputProps  } from "reactstrap";

interface PropsData{
    datatype?: InputProps["type"];
    className?: string;
    value ?: string | number; 
    placeholder ?: string;
    handleChange : (value: string ) => void;
    handleClickCall : () => void;
    buttonCss ?:string;
    mainclassname ?: string;
}

const SalesMobileInput  : FC <PropsData> = ({handleChange, handleClickCall,placeholder, value, datatype, className, buttonCss, mainclassname}) => {

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") handleClickCall();
    };

  return (
    <>
          <div className= {mainclassname ? mainclassname : "flex self-center my-[2rem] justify-end gap-x-3 border-0" }>
            <Input type={datatype}  className={className} placeholder={placeholder} value={value} onChange={(e) => handleChange(e.target.value)} onKeyUp={handleKeyUp} />
            <Button className= {buttonCss ? buttonCss : "px-[2rem] py-[0.9rem] bg-Cosmos dark:bg-TranquilBlack rounded-r-full text-[1.6rem] text-White absolute  dark:text-TitaniumWhite" } onClick={() => handleClickCall()}>  <FaSearch /> </Button>
          </div>
    </>
  )
}

export default SalesMobileInput