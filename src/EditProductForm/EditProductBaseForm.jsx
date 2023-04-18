import "./modalEdit.css";

export const EditProductBaseForm = ({ submitForm, children, title }) => {
return (
<>
    <form onSubmit={submitForm} className="form_edit_container">
    
    <h1 className="form__title">{title}</h1>
    <div className="form_edit_inputs">
    {children}
    </div>
    </form>
</>
);
};
