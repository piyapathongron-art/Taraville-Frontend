import ModalExitButton from "./ModalExitButton"


export default function GoogleStreetModal() {
  return (
      <dialog id="GoogleStreetModal" className="modal">
            <div className="modal-box max-w-[1000px]">
              <div className="w-full">
                <ModalExitButton modalId={"GoogleStreetModal"} />
                <iframe src="https://www.google.com/maps/embed?pb=!4v1774838480000!6m8!1m7!1s8mdOGjwgo3YMdkaWGQrLnw!2m2!1d16.43911020618971!2d101.1701172118998!3f48.06!4f-7.819999999999993!5f0.7820865974627469" className="w-full h-140 border-0" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              </div>
             
            </div>
          </dialog>
  )
}

