import { useState } from "react";
import styles from "./Item.module.css";
export function Item({ word, translation, id, onDeleteItem }) {
    const [isTranslationShown, setIsTranslationShown] = useState(false);

    function handleDeleteClick() {
        onDeleteItem(id)
    }

    return (
        <li className={styles.item}>
            <span className={styles.word}>
                (PL) <strong>{word}</strong>
            </span>
            <span className={styles.word}>
                (ANG)
                <strong> {isTranslationShown ? translation : "*".repeat(translation.length)}</strong>
            </span>
            <div className={styles.buttons}>
                <button
                    onClick={() =>
                        setIsTranslationShown((prevValue) => !prevValue)
                    }
                    className={styles.button}
                >
                    👁️
                </button>
                <button onClick={handleDeleteClick} className={styles.button}>
                    ✔️
                </button>
            </div>
        </li>
    );
}
