import {
  TypedUseSelectorHook,
  useDispatch as useDispatchUnTyped,
  useSelector as useSelectorUnTyped,
} from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorUnTyped;
export const useDispatch = () => useDispatchUnTyped<AppDispatch>();
