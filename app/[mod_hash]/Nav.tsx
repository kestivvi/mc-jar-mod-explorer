'use client';

import { useState } from "react";
import styles from './Nav.module.css';
import { SubPage } from "./page";


export default function Nav({ subpages, onChange }: {
    subpages: SubPage[], onChange: (subpage: SubPage) => void
}) {

    console.log("Nav");


    let [selected, setSelected] = useState<SubPage>(SubPage.General);

    const handleClick = (subPage: SubPage) => {
        setSelected(subPage);
        switch (subPage) {
            case SubPage.General:
                changeToGeneral();
                break;
            case SubPage.Raw:
                changeToRaw();
                break;

        }
    };


    return (
        <div className="p-4 flex gap-4">
            <div
                className={`${styles.item} ${selected == SubPage.General ? styles.selected : ""}`}
                onClick={() => handleClick(SubPage.General)}
            >
                General
            </div>
            <div
                className={`${styles.item} ${selected == SubPage.Raw ? styles.selected : ""}`}
                onClick={() => handleClick(SubPage.Raw)}
            >
                Raw
            </div>
        </div >
    )
}