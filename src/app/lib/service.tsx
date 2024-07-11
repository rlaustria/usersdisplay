import axios from 'axios';
import { ApiResponse, User } from '../types';

const url = 'https:/reqres.in';

export function getUsers(page: number) {
    return axios.get<ApiResponse>(`${url}/api/users?page=${page}`);
}
