export interface IOpeningHours {
    id: string;
    weekDay: DayOfWeek;
    openingTime: string;
    closingTime: string;
}

export interface IOpeningHoursCreate {
    restaurantId: string;
    weekDay: DayOfWeek;
    openingTime: string;
    closingTime: string;
}

export interface IOpeningHoursEdit {
    id: string;
    restaurantId: string;
    weekDay: DayOfWeek;
    openingTime: string;
    closingTime: string;
}

export enum DayOfWeek {
    SUNDAY,
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY
}