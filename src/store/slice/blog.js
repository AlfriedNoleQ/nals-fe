import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import qs from 'query-string'

const initialState = {
  blogs: [],
  isLoading: false
}

export const getBlogsApi = createAsyncThunk('blog/getBlogs', async params => {
  try {
    const result = await fetch(
      `https://5f55a98f39221c00167fb11a.mockapi.io/blogs?${qs.stringify(
        params
      )}`
    )
    if (!result.ok) throw new Error('something wrongs!')
    const data = await result.json()
    return data
  } catch (error) {
    console.log('error', error)
  }
})

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getBlogsApi.pending, state => {
        state.isLoading = true
      })
      .addCase(getBlogsApi.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.blogs = payload
      })
      .addCase(getBlogsApi.rejected, state => {
        state.isLoading = false
      })
  }
})

export const selectBlogs = state => state.blog.blogs
export const selectBlogsLoading = state => state.blog.isLoading

export const { getBlogs } = blogSlice.actions

export default blogSlice.reducer
