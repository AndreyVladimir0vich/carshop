import cn from 'classnames'
import './index.scss'

export const Form = ({ submitForm, children, title, className }) => {
  return (
    <>
      <form onSubmit={submitForm} className={cn('form', `${className ?? ''}`)}>
        <h3 className="form__title">{title}</h3>
        {children}
      </form>
    </>
  )
}
