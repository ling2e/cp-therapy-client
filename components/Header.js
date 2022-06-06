export default function Header({children , minHeight = "h-2/4",backgroundPosition = "center"}){
  return (
    <div className={`hero ${minHeight} h-80`} id="heroSection" style={{backgroundImage : 'url("/_assets/image/hero.jpg")',backgroundPosition}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
        {children}
            </div>
        </div>
    </div>
  )
}
