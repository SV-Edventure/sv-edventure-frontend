export interface Program {
    id: number;
    tag: string;
    title: string;
    subtitle?: string;
    description: string;
    feature: string;
    category: string;
    location: string;
    price: number;
    adultPrice: number;
    image: string;
    duration: number;
    startAt: string;
    ageMin?: number;
    ageMax?: number;
    isFree?: boolean;
    coordinates?: [number, number];
    latitude?: string;
    longitude?: string;
    sponsorImage?: string;
    websiteUrl?: string;
    type: string;
}

export const ProgramFields = [
    "id",
    "tag",
    "title",
    "subtitle",
    "description",
    "feature",
    "category",
    "location",
    "price",
    "adult_price",
    "image",
    "duration",
    "start_at",
    "age_min",
    "age_max",
    "is_free",
    "latitude",
    "longitude",
    "sponsor_image",
    "website_url",
    "type",
] as const;

export type ProgramField = typeof ProgramFields[number];