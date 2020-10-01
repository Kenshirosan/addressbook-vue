class Age {
    constructor() {
        this._age = null;
        this.minimum = 0;
        this.maximum = 120;
        this.isValid = false;
    }

    set age(age) {
        this._age = parseInt(age);
        if (
            isNaN(this._age) ||
            this._age < this.minimum ||
            this._age > this.maximum
        ) {
            return (this.isValid = false);
        }

        return (this.isValid = true);
    }

    get age() {
        return this._age;
    }
}

export default Age;
