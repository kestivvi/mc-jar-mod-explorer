import NavBar from './(root)/NavBar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'MC JAR mod explorer',
    description: 'Enables you to analyze unknown jar file',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className + ""}>
                <NavBar />
                <main className='flex flex-col items-center justify-center'>
                    <div className='w-5/8 flex flex-col items-center justify-center'>
                        {children}
                    </div>
                </main>
            </body>
        </html>
    )
}
