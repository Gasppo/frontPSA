import {Task} from './taskType'

export type Project = {
    _id: string;
    code: number;
    name: string;
    creationDate: string;
    updatedDate: string;
    startDate: string,
    endDate: string,
    type: string;
    state: string;
    client: number;
    clientType: string,
    productId: number;
    iteration: number;
    phase: number;
    tasks: Task[];
    //resoursed debería de ser un set
    resources: number[] ;
    risk: Risk ;
    description: string ;
}

export type Risk = {
    id: number;
    actionPlan: string;
    title: string;
    occurenceProb: number;
    impact: number;
    value: number;
    description: string | null;
}