export default function Field({ name, children }: { children: React.ReactNode, name: string }) {
    return (
        <div className="m-4 flex justify-center items-center gap-4">
            <h1 className="inline font-semibold">{name}</h1>
            <div>
                {children}
            </div>
        </div>
    )
}
