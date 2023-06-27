export default function Page({ params }: { params: { mod_hash: string } }) {
    console.log(params.mod_hash);
    return (
        <div>
            Dzień dobry {params.mod_hash}
        </div>
    )
}