export interface Category {
    id: string
    name: string
    color: string
    icon: string
    sortOrder: number
    createdAt: string
    updatedAt: string
}

export interface CreateCategoryRequest {
    name: string;
    color: string;
    icon: string;
}