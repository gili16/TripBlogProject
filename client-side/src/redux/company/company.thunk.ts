import { getCompanies } from "../../services/options";
import { OptionType } from "../../types/optionType.types";
import { AppThunk } from "../store";
import { init } from "./company.slice";

export const initCompany= (): AppThunk<OptionType> => async (dispatch, getState) => {

    try {
        let response = await getCompanies();
        dispatch(init(response))
        return response;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}