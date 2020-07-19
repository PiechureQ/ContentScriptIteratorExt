class Iterator {
    constructor(array) {
        this.data = array;
        this.value = array[0];
        this.index = 0;
        this.size = array.length;
    }

    hasNext() {
        if (this.index < this.size) {
            return true;
        } else {
            return false;
        }
    }

    next() {
        if (this.hasNext()) {
            let ret = this.value;
            this.index++;
            this.value = this.data[this.index];
            return ret;
        } else {
            return this.value;
        }
    }

    end() {
        if (!this.hasNext()) {
            return true;
        } else {
            return false;
        }
    }

    reset() {
        this.index = 0;
        this.value = this.data[this.index];
    }
}

module.exports = Iterator;