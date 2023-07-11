import { configureStore } from "@reduxjs/toolkit";
import HembegerSlice from "./HembegerSlice";
import ItemSlice from "../Utils/ItemSlice";
import SearchSlice from "./SearchSlice";
import LikeSlice from "./LikeSlice";
import SearchCache from "./SearchCache";
import ReplySlice from "./ReplySlice";

const Store = configureStore({
  reducer: {
    Icon: HembegerSlice,
    video: ItemSlice,
    search: SearchSlice,
    like: LikeSlice,
    cache:SearchCache,
    Reply:ReplySlice,
  },
});

export default Store;
