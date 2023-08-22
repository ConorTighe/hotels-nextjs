export interface IRoomData {
    city: string;
    minPrice: number;
    maxPrice: number;
    guests: number;
}

export interface IPhoto {
    id: number;
    url: string;
}

export interface IRoomType {
    id: number;
    maxPeople: number;
    numRoomsAvailable: number;
    pricePerPerson: number;
    typeName: string;
}

export interface IHotel {
    address: string;
    city: string;
    id: number;
    guests: number;
    stars: number;
    name: string;
    photos: IPhoto[];
    roomTypes: IRoomType[];
}

export interface ICityDropdown { 
    name: string,
    code: string
}