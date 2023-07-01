export default function NavBar() {
    return (
        <div className="p-3 flex justify-between items-center">
            <div className="flex items-center gap-8">
                <a href="/" className="flex items-center gap-6">
                    <img className="w-8" src="pickaxe-green.png" alt="logo" />
                </a>
                <nav className="flex items-center gap-4">
                    <a href="/">Home</a>
                    <a href="/last-uploaded">Last uploaded</a>
                </nav>
            </div>
            <div>
                Day/Night
            </div>
        </div>
    )
}