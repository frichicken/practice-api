const ModalContainer = ({ children }) => {
    return (
        <div className={'absolute inset-0 modal-container bg-[rgba(0,0,0,0.3)]'}>{children}</div>
    );
};

export default ModalContainer;
