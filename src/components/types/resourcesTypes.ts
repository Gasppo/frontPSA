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
}

export type Hours = {
    _id: string;
    hourAssignee:number;
    created: Date;
    startingDate: string;
    _v: number;
    task: Task;
    duration: number;
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
    licensedPersonCode: number;
    startingDate: string;
    durationDays: number;
    licenseType: string;
    created: Date;
}