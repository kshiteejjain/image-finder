import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IMAGE_API, ACCESS_KEY } from "../../app/utils/constant";
import {pageId} from './ProfilePic';

export const getImages = createAsyncThunk('imageList/images',
    (async, { getState, rejectWithValue }) => {
        const store = getState();
        const topic = store.users.slice(-1)[0].topic;
        const otherTopic = store.users.slice(-1)[0].otherTopic;
        const pageParam = '&page=';
        
        try{
            if (topic === 'Other') {
                localStorage.setItem('topic', otherTopic)
                return fetch(`${IMAGE_API}${otherTopic}${pageParam}${pageId}${ACCESS_KEY}`)
                    .then((res) => res.json());
            } else {
                localStorage.setItem('topic', topic)
                return fetch(`${IMAGE_API}${topic}${pageParam}${pageId}${ACCESS_KEY}`)
                    .then((res) => res.json());
            }
        }
        catch(error){
            console.log(error);
        }
    });


const ProfilePicSlice = createSlice({
    name: 'imageList',
    initialState: {
        images: [],
        selectedImage: [],
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(getImages.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(getImages.fulfilled, (state, action) => {
            state.loading = false;
            state.images = [];
            state.images.push(...action.payload.results.map(img => img.urls.small));
        })
        builder.addCase(getImages.rejected, (state) => {
            state.loading = true;
        })
    },
    reducers: {
        selectedImage: (state, action) => {
            if(!state.selectedImage?.includes(action.payload)){
                state.selectedImage.push(action.payload);
            }
        },
        removeImage: (state, action) => {
            const newImages = JSON.parse(JSON.stringify(state.images));
            state.images = newImages.filter(img => img !== action.payload);
        }
    },
});

export const { selectedImage, removeImage } = ProfilePicSlice.actions

export default ProfilePicSlice.reducer
