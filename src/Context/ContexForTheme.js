import React from 'react'

const ContextForTheme = React.createContext({
  isDark: true,
  toogleTheme: () => {},
})

export default ContextForTheme
