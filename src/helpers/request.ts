import { backendUrl } from '@/constants/constants';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';


const baseURL = backendUrl;
const instance = axios.create({ baseURL });


export const get = async (endpoint: string, params?: any): Promise<AxiosResponse> => {
    try {
        const response = await instance.get(endpoint, { params });
        return response;
    } catch (error) {
        console.error('Error in GET request:', error);
        throw error;
    }
};


export const post = async (endpoint: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
        const response = await instance.post(endpoint, data, config);
        return response;
    } catch (error) {
        console.error('Error in POST request:', error);
        throw error;
    }
};


export const put = async (endpoint: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
        const response = await instance.put(endpoint, data, config);
        return response;
    } catch (error) {
        console.error('Error in PUT request:', error);
        throw error;
    }
};


export const deleteReq = async (endpoint: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
        const response = await instance.delete(endpoint, config);
        return response;
    } catch (error) {
        console.error('Error in DELETE request:', error);
        throw error;
    }
};


export const patch = async (endpoint: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
    try {
        const response = await instance.patch(endpoint, data, config);
        return response;
    } catch (error) {
        console.error('Error in PATCH request:', error);
        throw error;
    }
};
