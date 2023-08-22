'use client';
import styles from "./components.module.css";
import { IHotel, IRoomType } from "@/app/interfaces/hotels";
import { Rating } from 'primereact/rating';
import { Card } from 'primereact/card';
import Image from "next/image";
import { useRouter } from 'next/navigation';

interface IProps {
    first: number;
    last: number;
    hotels: IHotel[];
}

export default function HotelList({ first, last, hotels }: IProps): JSX.Element | null {
    const router = useRouter();
    if (!hotels || !hotels.length) return null;

    const header = ({ photos }: IHotel): JSX.Element | null => {
        return photos && photos.length ? <Image height={200} width={365} alt="Card" src={photos[0].url} /> : null;
    }

    const el = hotels.slice(first, last);

    const lowestRoom = (roomTypes: IRoomType[]) => roomTypes.reduce((acc: IRoomType, el: IRoomType) => {
        if (acc.pricePerPerson > el.pricePerPerson) return el;
        return acc;
    }, roomTypes[0]);

    const handleClickHotel = (id: number) => {
        router.push(`/hotel/${id}`)
    }

    return (
        <>
            {el.map((hotel: IHotel) => (
                <Card data-cy={`hotels-id-${hotel.id}`} key={hotel.id} onClick={() => handleClickHotel(hotel.id)} className={styles.hotelCard} title={hotel.name} subTitle={
                    <Rating cancel={false} readOnly value={hotel.stars} stars={5} />
                } header={header(hotel)}>
                    <p className="m-0">
                        <i className="pi pi-building" /> {hotel.address}
                    </p>
                    <div>
                        <i className="pi pi-money-bill" /> Rooms starting at: ${lowestRoom(hotel.roomTypes).pricePerPerson}
                    </div>
                    <div>
                        <i className="pi pi-info" /> Rooms left at this price: {lowestRoom(hotel.roomTypes).numRoomsAvailable}
                    </div>
                </Card>
            ))}
        </>
    )
}
