import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    token: {
        accessToken: null
    },
    error: true,
    status: null,
    loading: false

}

// export const fetchData = createAsyncThunk('auth/authUser', async (req,res) => {
//     // try {
//         const response = await axios.get('http://localhost:5000/xyz')
//         .then(res => {
//             console.log('first',res);
//             return JSON.stringify(res?.data)
//         })
//         .catch(err => console.log('errrrrrr',err.message))
//         console.log('thunk response:',response)
//     // } catch (error) {
//     //     return error.message  
//     // }
// })


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log('action.payload',action.payload, state)
            // const { accessToken } = action.payload
            state.token.accessToken = action.payload;
            console.log('state.token',state.token?.accessToken)
        },  
        logOut: (state, action) => {
            state.token.accessToken = null
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(fetchData.pending, (state, action) => {
    //             state.loading = true
    //         })
    //         .addCase(fetchData.fulfilled, (state, action) => {
    //             console.log('fulfilled')
    //             state.token.accessToken = action.payload
    //             state.loading = false
    //         })
    //         .addCase(fetchData.rejected, (state, action) => {
    //             state.loading = false
    //             state.error = action.payload
    //         })
    // }
});


export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer

export const selectCurrentToken = (state) => state.root.auth.token;