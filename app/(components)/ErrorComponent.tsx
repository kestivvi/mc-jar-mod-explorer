export default function ErrorComponent({ error }: { error: string }) {
    return error ? <div className='text-red-700 text-lg font-semibold'>{error}</div> : null;
}