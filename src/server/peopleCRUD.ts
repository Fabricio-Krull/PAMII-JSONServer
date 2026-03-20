import axios from "axios";
import { urlBase } from "./apiJS";

const createUser = (name: string, surname: string, email: string) => {
    let newPerson = {nome:"", sobrenome:"", email:""}
    newPerson.nome = name;
    newPerson.sobrenome = surname;
    newPerson.email = email;
    return axios.post(`${urlBase}/people`, newPerson).then(response => {
        alert("Usuário criado com sucesso!");
    });
}

const updateUser = (person: any) => {
    return axios.put(`${urlBase}/people/${person?.id}`, person).then(response => {
        alert("Usuário atualizado com sucesso!");
    });
}

const getUsersByName = (filter: string, name: string) => {
    return axios.get(`${urlBase}/people?nome:${filter}=${name}`).then(response => {
        return response.data;
    });
}

const getUsersById = (id: string) => {
    return axios.get(`${urlBase}/people/${id}`).then(response => {
        return response.data;
    });
}

const deleteUser = (id: string) => {
    return axios.delete(`${urlBase}/people/${id}`).then(response => {
        alert("Usuário apagado com sucesso!");
    });
}

export {createUser, updateUser, getUsersByName, getUsersById, deleteUser};