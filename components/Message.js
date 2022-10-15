export default function Message({children, avatar, username, description, image}) {
    return(
        <div className="bg-white p-8 border-b-2 rounded-lg">
            <div  className="flex items-center gap-2">
                <img className="w-10 rounded-full" src={avatar} />
                <h2>{username}</h2>
            </div>
            <div className="py-4" >
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}