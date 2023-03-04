import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import qs from 'query-string'

const initialState = {
  blogs: [],
  isLoading: false,
  blog: {
    data: [],
    isLoading: false
  }
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

export const getBlogApi = createAsyncThunk('blog/getBlog', async id => {
  try {
    const result = await fetch(
      `https://5f55a98f39221c00167fb11a.mockapi.io/blogs/${id}`
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
      // get blogs
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

      // get blog
      .addCase(getBlogApi.pending, state => {
        state.blog.isLoading = true
      })
      .addCase(getBlogApi.fulfilled, (state, { payload }) => {
        state.blog.isLoading = false
        state.blog.data = payload
      })
      .addCase(getBlogApi.rejected, state => {
        state.blog.isLoading = false
      })
  }
})

export const selectBlogs = state => state.blog.blogs
export const selectBlogsLoading = state => state.blog.isLoading
export const selectBlog = state => state.blog.blog.data
export const selectBlogLoading = state => state.blog.blog.isLoading

export const { getBlogs, getBlog } = blogSlice.actions

export default blogSlice.reducer
