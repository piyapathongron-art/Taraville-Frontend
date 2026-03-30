import ModalExitButton from "./ModalExitButton"


export default function GoogleStreetModal01() {
  return (
    <div className="w-full">
        <ModalExitButton modalId={"GoogleStreetModal01"}/>
       <iframe src="https://www.google.com/maps/embed?pb=!4v1774839530222!6m8!1m7!1sn4nUypnKA-DYNYiK34q5TA!2m2!1d16.40554600110657!2d101.1425592819385!3f128.3069511845019!4f5.91781603069299!5f0.7820865974627469" className="w-full h-140 border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

