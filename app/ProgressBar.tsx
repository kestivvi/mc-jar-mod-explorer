import "./ProgressBar.css"

export default function ProgressBar({ value }: { value: number }) {
    return (
        <progress value={value} max="100"></progress>
    )
}
