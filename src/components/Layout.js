export default function Layout({children}){
    return(
      <div
      className="
       bg-center 
       bg-gradient-to-r from-gray-800 to-gray-950
       backdrop-opacity-10 
       bg-cover min-h-screen 
       flex flex-col justify-center 
        items-center text-gray-300" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)' }}>
{children}
      </div>
    )
}