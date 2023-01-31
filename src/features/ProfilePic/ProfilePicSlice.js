import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IMAGE_API, ACCESS_KEY } from "../../app/utils/constant";

export const getImages = createAsyncThunk('imageList/images',
    (_, { getState }) => {
    const store = getState();
    const topic = store.users[0].topic;
    const otherTopic = store.users[0].otherTopic;
    if(topic === 'Other'){
        return fetch(`${IMAGE_API}${otherTopic}${ACCESS_KEY}`)
        .then((res) => res.json());
    }else{
        return fetch(`${IMAGE_API}${topic}${ACCESS_KEY}`)
        .then((res) => res.json());
    }
  })

const ProfilePicSlice = createSlice({
    name: 'imageList',
    initialState: {
        images: [],
        loading: false,
    },
    extraReducers:  (builder) => {
        builder.addCase(getImages.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getImages.fulfilled, (state, action) => {
            state.loading = false;
            state.images.push(action.payload);
            console.log(action.payload)
        })
        builder.addCase(getImages.rejected, (state) => {
            state.loading = true;
        })
    }
});

export default ProfilePicSlice.reducer
