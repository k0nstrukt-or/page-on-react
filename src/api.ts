import { PositionResponse } from "./types/PositionResponse";
import { Token } from "./types/Token";
import { UsersPagination } from "./types/UsersPagination";

const BASE_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1';

export const getUsersPagination = (count: number): Promise<UsersPagination> => {
  return fetch(`${BASE_URL}/users?count=${count}`)
    .then(response => response.json());
};

export const getToken = (): Promise<Token> => {
  return fetch(`${BASE_URL}/token`)
    .then(response => response.json());
};

export const addUser = async (formData: FormData) => {
  const token = await getToken().then(data => data.token);
  
  return fetch(`${BASE_URL}/users`, { 
    method: 'POST', 
    headers: { 'Token': token },
    body: formData, 
  })
  .then(response => response.json())
}

export const getPositions = (): Promise<PositionResponse> => {
  return fetch(`${BASE_URL}/positions`)
    .then(response => response.json());
};
