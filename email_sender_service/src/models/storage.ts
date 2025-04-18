interface IStorage {
    getUserData() : string
    setUserData(data: string) : void

    getUserRating() : number
    changeRatingBy(value: number) : void
    getTopRatingList() : string[]
}

export default IStorage;