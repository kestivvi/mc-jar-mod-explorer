export default function Record({ name, version, hash }: { name: string, version: string, hash: string }) {
    return (
        <div className="flex gap-5">
            <div>{name}</div>
            <div>{version}</div>
            <div>{hash}</div>
        </div>
    )
}