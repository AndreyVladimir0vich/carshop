import classNames from 'classnames'
import React, { useState } from 'react'
import s from './index.module.css'

const Accordion = ({ children, title }) => {
  const [selected, setSelected] = useState(false)

  return (
    <div className={classNames(s.accordion, { [s.active]: selected })}>
      <button
        className={s.accordionButton}
        onClick={() => setSelected((state) => !state)}
      >
        <p className={s.title}>{title}</p>
      </button>
      <div className={s.content}>
        <p className={s.text}>{children}</p>
      </div>
    </div>
  )
}

export default Accordion
