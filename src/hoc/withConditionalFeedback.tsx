import { SkeletonProductCard } from '@/components/loader/skeleton-product-card.component'

export const withConditionalFeedbackProductCard =
  (Component: any) => (props: any) => {
    //   if (props.isLoading) return <div>Loading data.</div>
    //   if (!props.data) return <div>No data loaded yet.</div>
    //   if (!props.data.length) return <div>Data is empty.</div>

    if (props.isFetching)
      return (
        <SkeletonProductCard
          isFetching={props.isFetching}
        ></SkeletonProductCard>
      )
    if (!props.products.length) return <div>Data is empty.</div>

    return <Component {...props} />
  }
