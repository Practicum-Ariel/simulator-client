import { useState, useEffect } from 'react'

export default function Checkbox ({sens, setSelectedSens}) {
    const [isChecked, setIsChecked] = useState(false)
  
    useEffect(() => {
      if (isChecked) setSelectedSens(sens)
    }, [isChecked])
  
  
    return (
      <input type='checkbox' id={sens} name={sens} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
    )
  }