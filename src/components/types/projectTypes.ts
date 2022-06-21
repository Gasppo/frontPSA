import {Task} from './taskType'

export type Project = {
    _id: string;
    code: number;
    name: string;
    creationDate: String;
    updatedDate: String;
    startDate: String,
    endDate: String,
    type: string;
    state: string;
    client: number;
    clientType: string,
    productId: number;
    iteration: number;
    phase: number;
    tasks: Task[];
    //resoursed debería de ser un set
    resources: number[] | null;
    risk: Risk | null;
    description: string | null;
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