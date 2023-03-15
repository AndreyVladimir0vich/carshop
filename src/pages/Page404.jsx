import React from 'react'

const Page404 = ({ navigate }) => {
  return (
    <div className="container">
      <h1>Страница не сушествует 404</h1>
      <button onClick={() => navigate('/')}>В каталог</button>
    </div>
  )
}

export default Page404
