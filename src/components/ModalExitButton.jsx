

function ModalExitButton(props) {
    const {modalId, func} = props
    const Xbtn = () => {
        document.getElementById(modalId).close();
    };

    return (
        <form method="dialog">
            <button type='button' onClick={Xbtn} className="btn btn-sm btn-circle btn-ghost absolute right-0 top-0">✕</button>
        </form>
    )
}

export default ModalExitButton