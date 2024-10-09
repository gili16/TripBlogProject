import { getViews } from "../../services/options";
import { OptionType } from "../../types/optionType.types";
import { AppThunk } from "../store";
import { init } from "./view.slice";

export const initViews = (): AppThunk<OptionType> => async (dispatch, getState) => {

    try {
        let response = await getViews();
        dispatch(init(response))
        return response;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}