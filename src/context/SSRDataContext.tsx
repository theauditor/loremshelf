import React, { createContext, useContext } from 'react'

interface SSRDataContextType {
  initialData: any
}

const SSRDataContext = createContext<SSRDataContextType>({ initialData: {} })

export const SSRDataProvider: React.FC<{ initialData: any; children: React.ReactNode }> = ({ 
  initialData, 
  children 
}) => {
  return (
    <SSRDataContext.Provider value={{ initialData }}>
      {children}
    </SSRDataContext.Provider>
  )
}

export const useSSRData = () => {
  return useContext(SSRDataContext)
}

