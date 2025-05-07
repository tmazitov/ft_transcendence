export default class RadishResponse {
    _status: number;
    _error: string | undefined;
    _data: Record<string, any> | undefined;

    constructor(input: string) {

        const obj = JSON.parse(input);

        const {status, error, data} = obj;
        if (status === undefined || status !instanceof Number) {
            throw new Error('Response error: status is required');
        }

        this._status = status;
        this._error = error;
        this._data = data ? JSON.parse(data) : undefined;
    }

    get value() {
        if (!this._data)
            return undefined

        return this._data.value
    }

    get status() {
        return this._status
    }

    get error() {
        return this._error
    }

    get data() {
        return this._data
    }
}