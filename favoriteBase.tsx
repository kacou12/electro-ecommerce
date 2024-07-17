export const apiSlice = createApi({
  // ...other slice properties
  endpoints: (builder) => ({
    updatePost: builder.mutation<Post, Partial<Post>>({
      query: (updatedPost) => ({
        url: `posts/${updatedPost.id}`,
        method: 'PUT',
        body: updatedPost
      }),
      // Optimistically update the cache
      onQueryStarted: async (updatedPost, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getPosts', undefined, (draft) => {
            const post = draft.find((p) => p.id === updatedPost.id)
            if (post) {
              Object.assign(post, updatedPost)
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      }
    })
  })
})
