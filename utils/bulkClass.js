const internals = {}

exports = module.exports = options => {
    return new internals.Bulk(options)
}

internals.Bulk = class {
    constructor(options) {
        this.conn = options.conn
        this.query = options.query
        this.batch = options.batch
        this.counter = 0
        this.store = []
    }

    add(record) {
        this.store.push(record)
        this.counter++
        if(this.counter>this.batch) {
            return this.flush()
        }
        return Promise.resolve()
    }

    flush() {
        if(this.counter>0) {
            const res = this.conn.query(this.query, [this.store]).catch((err)=>{console.log(err);})
            this.counter = 0
            this.store = []
            return res
        }
        return Promise.resolve()
    }
}
