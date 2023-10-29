import React from 'react'

const ContextForTheme = React.createContext({
  isDark: false,
  toogleTheme: () => {},
})

export default ContextForTheme
