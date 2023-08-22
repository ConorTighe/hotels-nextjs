'use client';
import { useState } from "react";
import { Nullable } from "primereact/ts-helpers";
import { Button } from 'primereact/button';
import GuestInput from "./components/guest-input";
import PriceSlider from "./components/price-slider";
import styles from "./page.module.css";
import CityDropdown from "./components/city-dropdown";
import { SliderChangeEvent } from "primereact/slider";
import HotelList from "./components/hotel-list";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { DropdownChangeEvent } from "primereact/dropdown";
import { ICityDropdown } from "./interfaces/hotels";
import useHotel from "./hooks/hotels";


export default function Home() {
  const pages = 20;
  const [guests, setGuests] = useState<number>(0);
  const [range, setRange] = useState<[number, number]>([0, 100]);
  const [city, setCity] = useState<ICityDropdown>({ name: "", code: "" });
  const [first, setFirst] = useState(0);
  const [last, setLast] = useState(pages);
  const [rows, setRows] = useState(pages);
  const { hotels, findRooms } = useHotel();

  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Madrid', code: 'MAD' },
    { name: 'Paris', code: 'PRS' }
  ];

  const handleGuestInput = ({ value }: { value: Nullable<number | null> }) => {
    if (!value) return;
    setGuests(value)
  }

  const handleRangeInput = ({ value }: SliderChangeEvent) => {
    const newRange = value as [number, number];
    if (!newRange || !newRange?.length) return;
    setRange(newRange)
  }

  const handleCityInput = ({ value }: DropdownChangeEvent) => {
    if (!value) return;
    setCity(value)
  }

  const handleSearchRooms = () => {
    const data = { city: city.name, guests, minPrice: range[0], maxPrice: range[1] }
    if (findRooms) findRooms(data);
  }

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setFirst(event.first);
    setRows(event.rows);
    setLast(event.first + event.rows);
  };

  return (
    <main className={styles.main}>
      <div className={styles.firstRow}>
        <GuestInput handleGuestInput={handleGuestInput} guests={guests} />
        <PriceSlider handleRangeInput={handleRangeInput} range={range} />
      </div>
      <div className={styles.secondRow}>
        <CityDropdown cities={cities} selectedCity={city} handleCityInput={handleCityInput} />
      </div>
      <div className={styles.thirdRow}>
        <Button onClick={handleSearchRooms}>Search</Button>
      </div>
      <div className={styles.hotelRow}>
        <HotelList hotels={hotels} first={first} last={last} />
      </div >
      <div className={styles.footer}>
        <Paginator first={first} rows={rows} totalRecords={hotels.length} onPageChange={onPageChange} />
      </div>
    </main>
  )
}
