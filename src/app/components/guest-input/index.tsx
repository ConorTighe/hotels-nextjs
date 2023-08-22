'use client';
import { InputNumber, InputNumberValueChangeEvent } from "primereact/inputnumber";
import styles from "./component.module.css";

interface IProps {
    handleGuestInput: (e: InputNumberValueChangeEvent) => void;
    guests: number;
}

export default function GuestInput({ handleGuestInput, guests }: IProps) {
    return (
        <div className={styles.guestInput}>
            <span className={styles.guestInputText}>Number of guests:</span>
            <InputNumber data-testid="guest-input" size={2} value={guests} onValueChange={(e) => handleGuestInput(e)} showButtons />
        </div>
    )
}