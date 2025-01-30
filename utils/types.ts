export interface Itasks {
    id: string;
    content: string;
    checkDone: boolean;
    isDeleted: boolean;
}

export interface IContext {
    showDorp: boolean;
    taskText: string;
    tasksList: Itasks[];
    setTasksList: (value: Itasks[]) => void;
    tasKerror: boolean;
    taskLoading: boolean;
    getTasks: () => void;
}
