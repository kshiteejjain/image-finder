import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IMAGE_API, ACCESS_KEY } from "../../app/utils/constant";

export const getImages = createAsyncThunk('imageList/images',
    (async, { getState }) => {
    const store = getState();
    const topic = store.users[0].topic;
    const otherTopic = store.users[0].otherTopic;

    if(topic === 'Other'){
        localStorage.setItem('topic', otherTopic)
        return fetch(`${IMAGE_API}${otherTopic}${ACCESS_KEY}`)
        .then((res) => res.json());
    }else{
        localStorage.setItem('topic', topic)
        return fetch(`${IMAGE_API}${topic}${ACCESS_KEY}`)
        .then((res) => res.json());
    }
  })

const ProfilePicSlice = createSlice({
    name: 'imageList',
    initialState: {
        images: [],
        selectedImage: {},
        loading: false,
    },
    extraReducers:  (builder) => {
        builder.addCase(getImages.pending, (state, action) => {
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
    },
    reducers: {
        selectedImage: (state, action) => {
            state.selectedImage = action.payload;
        },
        removeImage: (state, action) => {
            state.images = state.images.filter((id) => {
                console.log('id is' + id.results[0].urls.small)
                return id !== action.payload;
            })
        }
      },
});

export const { selectedImage, removeImage } = ProfilePicSlice.actions

export default ProfilePicSlice.reducer
