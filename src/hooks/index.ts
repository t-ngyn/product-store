import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
import { AppDispatch, AppState } from "../store";
import { useEffect, useRef } from "react";

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const usePrevious = (value: number | undefined) => {
  const ref = useRef<number>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
