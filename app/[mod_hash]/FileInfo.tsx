import { format } from 'date-fns';

const byteToHumanReadable = (size_bytes: number): string => {
    return size_bytes.toString();
};

const dateToHumanReadable = (date: Date): string => {
    if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
    }

    return format(date, 'yyyy-MM-dd HH:mm');
};

export default function FileInfo({ hash, size_bytes, last_analisis_date, times_checked, virus_total_link }: {
    hash: string, size_bytes: number, last_analisis_date: Date, times_checked: number, virus_total_link: string,
}) {


    console.log("FileInfo");

    return (
        <div className="flex border p-4 items-center gap-8">
            <div className='flex flex-col items-center'>
                <div className='font-bold'>Hash (SHA265)</div>
                <div>{hash}</div>
                {/* TODO Virus total link style and placement */}
                {/* <div>{virus_total_link}</div> */}
            </div>
            <div className='flex flex-col items-center'>
                <div className='font-bold'>Size</div>
                <div>{byteToHumanReadable(size_bytes)}</div>
            </div>
            <div className='flex flex-col items-center'>
                <div className='font-bold'>Last Analizis Date</div>
                <div>{dateToHumanReadable(last_analisis_date)}</div>
            </div>
            <div className='flex flex-col items-center'>
                <div className='font-bold'>Number of Analizes</div>
                <div>{times_checked}</div>
            </div>
            <img className="w-16" src="/jar.png" alt="jar icon" />
        </div>
    )
}