export default function NavBar() {
    return (
        <nav>
            <div className="p-3 flex justify-center gap-10 items-center border-b-slate-600 shadow-xl">
                <a href="/"><img className="w-10" src="logo.png" alt="logo" /></a>
                <a href="/"><h1 className="font-bold text-xl">Minecraft JAR mod explorer</h1></a>
            </div>
        </nav>
    )
}