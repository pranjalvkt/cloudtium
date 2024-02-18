const getTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString()
}
export default getTime;