import { configureStore } from "@reduxjs/toolkit";
import HembegerSlice from "./HembegerSlice";
import ItemSlice from "../Utils/ItemSlice";
import SearchSlice from "./SearchSlice";
import LikeSlice from "./LikeSlice";
import SearchCache from "./SearchCache";
import ReplySlice from "./ReplySlice";
import isCommentPost from "./isCommentPost";
import SubscribeSlice from "./SubscribeSlice";
import NotificationSlice from "./NotificationSlice";
import UserSlice from "./UserSlice";
import ThemeSlice from "./ThemeSlice";
import AuthSlice from "./authSlice";
import historySlice from "./historySlice";
import playlistSlice from "./playlistSlice";
import commentSlice from "./commentSlice";
import NoteSlice from "./noteSlice";

const Store = configureStore({
  reducer: {
    Icon: HembegerSlice,
    video: ItemSlice,
    search: SearchSlice,
    like: LikeSlice,
    cache: SearchCache,
    Reply: ReplySlice,
    isComment: isCommentPost,
    subscribe:SubscribeSlice,
    notification:NotificationSlice,
    user:UserSlice,
    theme:ThemeSlice,
    auth:AuthSlice,
    history:historySlice,
    playlist:playlistSlice,
    comment:commentSlice,
    notes:NoteSlice
  },
})

export default Store;
