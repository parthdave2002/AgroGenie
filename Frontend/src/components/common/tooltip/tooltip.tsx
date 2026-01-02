import { FC, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
  tooltip?: string;
}

const Tooltips: FC<Props> = ({ children, tooltip }): JSX.Element => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = clientX - left + "px";
      }}
      className="group relative inline-block ">
      {children}
      {tooltip ? (
        <div className="">
          <span ref={tooltipRef} className="invisible z-10 p-2 group-hover:visible opacity-0 group-hover:opacity-100 transition bg-gray-400 text-white p-1 rounded absolute top-full whitespace-nowrap dark:bg-gray-900 dark:text-white" >
           <div >  {tooltip}</div> 
          </span>
        
        </div>
      ) : null}
    </div>
  );
};
export default Tooltips;
