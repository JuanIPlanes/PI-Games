


import { combineReducers } from 'redux'
import Genres from './Genres/genres.reducer'
import Detail from './Detail/detail.reducer'
import VideoGames from './VideoGame/vg.reducer'
import SearchBar from './SearchBar/Sb.reducer'
import VG_Options from './VideoGame-options/vg.reducer'
import Loaded from './Initial/init.actions'
export default combineReducers({
    Loaded,
    SearchBar,
    Detail,
    Genres,
    VG_Options,
    VideoGames
})
