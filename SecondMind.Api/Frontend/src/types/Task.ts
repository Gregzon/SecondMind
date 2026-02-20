export interface Task {
    id: string;
    title: string;
    description?: string;
    priority: number;
    categoryId: string;
    categoryName?: string;
    createdAt: string;
    isCompleted: boolean;
    aiSummary?: string;
    aiSuggestions?: string;
}
