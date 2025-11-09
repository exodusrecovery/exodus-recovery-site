import React from 'react'
type Props = React.SelectHTMLAttributes<HTMLSelectElement>
export function Select({ children, ...rest }: Props){
  return <select className="w-full h-10 rounded-xl border border-slate-300 px-3" {...rest}>{children}</select>
}
export const SelectTrigger = (p:any)=> <div {...p}/>
export const SelectValue   = (p:any)=> <span {...p}/>
export const SelectContent = (p:any)=> <div {...p}/>
export const SelectItem    = ({value, children}:{value:string,children:any})=> <option value={value}>{children}</option>
