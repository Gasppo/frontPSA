export type Task= {
    _id: string;
    priority:number;
    name: string;
    description: string;
    effort:number;
    resource:number;
    code:number;
    _v: number;
    proyectCode: number;
    proyectName: string;
    totalHours:number;
}

export type Hours = {
    _id: string;
    hourAssignee:number;
    created: Date;
    startingDate: string;
    _v: number;
    task: Task;
    duration: number;
    deviation: number|0;
}

export type SelectProyect = {
    value: number,
    label:string
}

export type Proyect = {
    _id: string;
    name: string;
    creationDate: Date;
    startDate: Date;
    endDate: Date;
    updateDate: Date;
    type: string;
    state: string;
    client: number;
    risk: number;
    productId: number;
    fase: number;
    iteration:number;
    description:string;
    tasks:Task[];
    code:number;
}

export type Event = {
    title: string;
    start: number;
    end: number;
    allDay: boolean;
    timeZone: string;
    color: string;
}

export type License = {
    _id:string;
    licensedPersonCode: number;
    startingDate: string;
    durationDays: number;
    licenseType: string;
    created: Date;
}

export type LicenseType = {
    value: number;
    label:string

}

export type SelectResource = {
    value: number,
    label:string
}

export type Resource = {
    legajo: number;
    Nombre: string;
    Apellido: string;
}

export type ProjectReport={
    _id: string;
    name: string;
    description: string;
    resource:number;
    code:number;
    hours_worked:number | 0;
    deviation:number | 0;
    effort:number | 0;
}
