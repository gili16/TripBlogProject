import { getCategories } from "../../services/options";
import { OptionType } from "../../types/optionType.types";
import { AppThunk } from "../store";
import { init } from "./category.slice";

export const initCategory = (): AppThunk<OptionType> => async (dispatch, getState) => {

    try {
        let response = await getCategories();
        dispatch(init(response))
        return response;
    } catch (error) {

        alert("failed to add")
        return null;
    }
}