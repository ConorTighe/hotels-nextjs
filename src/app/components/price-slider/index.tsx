'use client';
import { Slider, SliderChangeEvent } from 'primereact/slider';
import styles from "./component.module.css";

interface IProps {
    handleRangeInput: (e: SliderChangeEvent) => void;
    range: [number, number];
}

export default function PriceSlider({ handleRangeInput, range }: IProps): JSX.Element {
    return (
        <div className={styles.priceSlider}>
            <span className={styles.priceSliderText}>Price per person:</span>
            <Slider className={styles.slider} value={range} onChange={(e) => handleRangeInput(e)} range />
            <span style={{ whiteSpace: "nowrap", padding: "10px 10px" }}>{`${range.toString().replace(",", "-")}`}</span>
        </div>
    )
}
