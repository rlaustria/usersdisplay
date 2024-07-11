import axios from 'axios';
import { ApiResponse, User } from '../types';

export function getUsers(page: number) {
    return axios.get<ApiResponse>(`https:/reqres.in/api/users?page=${page}`);
}
