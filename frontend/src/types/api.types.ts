export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
    ok: boolean;
}

export interface ApiError {
    message: string;
    status: number;
    errors?: Record<string, string[]>; // Validation errors
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        total: number;
        totalPages: number;
        currentPage: number;
        limit: number;
    }
}
