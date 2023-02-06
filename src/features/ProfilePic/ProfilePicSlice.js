import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IMAGE_API, ACCESS_KEY } from "../../app/utils/constant";

export const getImages = createAsyncThunk('imageList/images',
    (async, { getState }) => {
        const store = getState();
        const topic = store.users.slice(-1)[0].topic;
        const otherTopic = store.users.slice(-1)[0].otherTopic;
        //let pageNum = '&page=' ${pageId};
        if (topic === 'Other') {
            localStorage.setItem('topic', otherTopic)
            return fetch(`${IMAGE_API}${otherTopic}${ACCESS_KEY}`)
                .then((res) => res.json());
        } else {
            localStorage.setItem('topic', topic)
            return fetch(`${IMAGE_API}${topic}${ACCESS_KEY}`)
                .then((res) => res.json());
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
            if(state.images > 1){
                alert('as');
            }
        }
    },
});

export const { selectedImage, removeImage } = ProfilePicSlice.actions

export default ProfilePicSlice.reducer
