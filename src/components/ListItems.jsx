function ListItems(){
  const categories =[
    "All",
    "Music",
    "React Routers",
    "Computer Programming",
    "Reverberation",
    "Movie Musicals",
    "India National Cricket team",
    "News",
    "Mixes",
    "1990s",
    "Telegu Cinema",
    "Live",
    "Dramedy",
    "Dubbing",
    "Indian soap Opera",
    "Criket",
    "Football",
    "Learn Coding"
  ]
  return (
    <div className="flex overflow-x-scroll hide-scroll-bar px-4">
      <div className="flex space-x-4 flex-nowrap">
        {categories.map((category)=>{
          return(
            <div key={category}
            className="mb-4 flex-none bg-gray-200 hover:bg-gray-300 duration-300 rounded-xl px-4 py-2 font-medium text-gray-700 cursor-pointer">
              {category}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default ListItems