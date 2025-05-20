import axios from 'axios'

// TODO: get from env
const BASE_URL = 'https://diplomado-journal-services-2-main-mjdnei.laravel.cloud/api';

export const api = axios.create({
  baseURL: BASE_URL
})
