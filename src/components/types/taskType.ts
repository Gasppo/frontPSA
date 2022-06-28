export type Task = {
    _id: string;
    project_code: number |null;
    code: number;
    name: string;
    priority: number;
    effort: number;
    effortUnit: string;
    realEffort: number;
    resource: number;
    isCompleted: number,
    description: string | null;
    ticket: number
}