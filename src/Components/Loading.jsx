import loader from "../Loadingprop/properties/loader.svg"
function Loading(){
    return(
        <div className="bg-black bg-opacity-50 flex items-center justify-center fixed left-0 right-0 top-0 bottom-0 z-50">
            <div><img src={loader} alt="loader" className=""/></div>
        </div>
    )
}
export default Loading