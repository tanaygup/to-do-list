
const Navbar = () => {
  return (
    <nav className="flex justify-between bg-violet-800 text-white py-2 " >
        <div className="logo">
            <span className="px-5 font-bold" >tg-ToDo</span>
        </div>
      <ul className="flex space-x-7 px-10 ">
        <li className="cursor-pointer hover:font-bold transition-all mx-10" >Home</li>
        <li className="cursor-pointer hover:font-bold transition-all" >Your tasks</li>
        
      </ul>
    </nav>
     
  )
}

export default Navbar
