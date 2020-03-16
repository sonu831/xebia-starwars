import axios from 'axios';
const baseURL = 'https://swapi.co/api/';


export const getAllPeople = (page) => axios.get(`${baseURL}people/?page=${page}`);

export const getALLPlanets =(page)=>axios.get(`${baseURL}planets/?page=${page}`);

export const getALLStartShips =()=>axios.get(`${baseURL}starships/`);

export const getPeople = (id) => axios.get(`${baseURL}people/${id}/`);

export const getPlanet =(id)=>axios.get(`${baseURL}planets/${id}/`);

export const getStartShip =(id)=>axios.get(`${baseURL}starships/${id}/`);


