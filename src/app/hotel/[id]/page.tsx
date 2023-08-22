import { IHotel } from "@/app/interfaces/hotels";
import axios from "axios";
import styles from "./page.module.css";
import Image from "next/image";


interface IProps {
    params: { id: string }
}

const getHotelById = async (hotelId: string): Promise<IHotel> => {

    const res = await axios.get(`http://localhost:8080/hotel?id=${hotelId}`);

    const currentPageHotel: IHotel = await res.data;

    // Pass data to the page via props
    return currentPageHotel;
}

export default async function Hotel({ params }: IProps) {
    const hotel = await getHotelById(params.id)


    return (
        <main className={styles.main}>
            <div className={styles.titleRow}>
                <h1 className={styles.header}>{hotel.name}</h1>
            </div>
            <div className={styles.addressRow}>
                <p className={styles.header}>{hotel.address} - {hotel.city}</p>
                <div>
                    <a href="http://maps.google.com/maps?q=210+Louise+Ave,+Nashville,+TN+37203">
                        <i style={{ fontSize: '1.5rem', marginRight: "6px" }} className="pi pi-globe" />
                    </a>
                </div>
            </div>
            <div>
                <div className={styles.imageRow}>
                    {hotel.photos.map(photo => <Image className={styles.image} key={photo.id} height={320} width={400} alt="Card" src={photo.url} />)}
                </div>
            </div>
            <h2 className={styles.subheader}>Rooms available</h2>
            <div className={styles.roomsRow}>
                {hotel.roomTypes.map(el => (
                    <div className={styles.roomList} key={el.id}>
                        <h3>{el.typeName}</h3>
                        <span>{`Max people per room: ${el.maxPeople}`}</span>
                        <span>{`Avaiable rooms: ${el.numRoomsAvailable}`}</span>
                        <span >{`Price per person $${el.pricePerPerson}`}</span>
                        <br />
                    </div>))}
                <button className={styles.button} type="button">Book room</button>
            </div>
        </main>
    )
}
