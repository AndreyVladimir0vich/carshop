import cn from "classnames";
import "./modalEdit.css";

export const ModalEditProduct = ({ activeModal, setShowModal, children}) => {
return (
    <>
    <div
        className={cn("modal_edit", { ["active"]: activeModal })} onClick={()=>{setShowModal(false)}}
    >
        <div
        className={cn("modal_content_edit", { ["active"]: activeModal })}
        onClick={(e) => e.stopPropagation()}
        >
        {children}
        </div>
    </div>
    </>
);
};

