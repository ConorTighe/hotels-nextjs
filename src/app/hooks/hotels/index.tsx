"use client"
import { IHotel, IRoomData } from "@/app/interfaces/hotels";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useHotel() {
    const [hotels, setHotels] = useState<IHotel[]>([]);

    useEffect(() => {
        const getHotels = async () => {
            const res = await axios.get("http://localhost:8080/hotels");
            setHotels(res.data);
        };

        getHotels();
    }, []);

    const findRooms = async ({ city, minPrice, maxPrice, guests }: IRoomData) => {
        try {
            const res = await axios.get(
                `http://localhost:8080/hotels/room?city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}&guests=${guests}`
            );

            const newHotels: IHotel[] = res.data.map(({ hotel }: { hotel: IHotel }) => hotel);
            setHotels(newHotels);
        } catch (e) {
            alert("Error: Request failed");
        }
    }

    return { hotels, findRooms }
}
