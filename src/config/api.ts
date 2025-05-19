import axios from 'axios'

// TODO: get from env
const BASE_URL = 'https://diplomado-journal-api-main-m9mort.laravel.cloud/api';

export const api = axios.create({
  baseURL: BASE_URL
})
