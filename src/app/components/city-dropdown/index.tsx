import { ICityDropdown } from "@/app/interfaces/hotels";
import styles from "./component.module.css";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";

interface IProps {
    handleCityInput: (e: DropdownChangeEvent) => void;
    cities: ICityDropdown[];
    selectedCity: ICityDropdown;
}

export default function CityDropdown({ handleCityInput, cities, selectedCity }: IProps): JSX.Element {

    return (
        <div className={styles.cityInput}>
            <span className={styles.cityText}>City: </span>
            <Dropdown onChange={(e) => handleCityInput(e)} className={styles.dropdown} value={selectedCity} options={cities} optionLabel="name"
                placeholder="City" />
        </div>
    )
}