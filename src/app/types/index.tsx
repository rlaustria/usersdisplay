export type User = {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
};

export type ApiResponse = {
    page: number;
    per_page: number;
    total: 12;
    total_pages: 2;
    data: User[];
    support: {
        url: string;
        text: string;
    };
};
