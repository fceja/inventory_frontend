import "@scss/common/Loading.scss";

interface LoadingI {
    className?: string
}
const Loading = (props: LoadingI) => {
    const { className } = props
    return (
        <div className={className ? `loading-${className}` : 'loading'}>
            <div className="loading-spinner"></div>
        </div>
    )
}

export default Loading
