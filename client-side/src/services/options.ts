import axios from '../utils/axios'
import { OptionType } from '../types/optionType.types'
import { ENDPOINTS } from '../api/endpoints'

export const getCategories = async () => {
    const response = await axios.get(`${ENDPOINTS.category.base}${ENDPOINTS.category.getAll}`)
    const categories =  response.data
    return categories
}

export const getStatuses = async () => {
    const response = await axios.get(`${ENDPOINTS.status.base}${ENDPOINTS.status.getAll}`)
    const statuses =  response.data
    return statuses
}

export const getLevels = async () => {
    const response = await axios.get(`${ENDPOINTS.level.base}${ENDPOINTS.level.getAll}`)
    const levels =  response.data
    return levels
}
export const getCompanies= async () => {
    const response = await axios.get(`${ENDPOINTS.company.base}${ENDPOINTS.company.getAll}`)
    const companies =  response.data
    return companies
}

export const getDayPart = async () => {
    const response = await axios.get(`${ENDPOINTS.dayPart.base}${ENDPOINTS.dayPart.getAll}`)
    const dayParts =  response.data
    return dayParts
}

export const getExperiences = async () => {
    const response = await axios.get(`${ENDPOINTS.experience.base}${ENDPOINTS.experience.getAll}`)
    const expriences =  response.data
    return expriences
}

export const getViews = async () => {
    const response = await axios.get(`${ENDPOINTS.view.base}${ENDPOINTS.view.getAll}`)
    const views =  response.data
    return views
}