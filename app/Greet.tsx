import styles from './Greet.module.css'

export default function Greet() {
    return (
        <>
            <div className="flex items-center gap-6">
                <img className="w-24" src="pickaxe-green.png" alt="logo" />
                <h1 className={styles.greenColor + " font-bold text-6xl"}>MC Jar Mod Scanner</h1>
            </div >
            <div className='text-center'>
                Analyze an unknown Minecraft mod by uploading its JAR file. <br />
                Currently suppporting only fabric mods.
            </div>
        </>
    )
}