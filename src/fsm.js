class FSM {

    constructor(config) {
        if (!config) throw new Error();
        else {
            this.initial = config.initial;
            this.states = config.states;
            this.history = [];
            this.undo_history = [];
        }
    }

    getState() {
        return this.initial;
    }

    changeState(state) {
        if (state in this.states){
            this.history.push(this.initial);
            this.initial = state;
        } else {
            throw new Error();
        }
    }

    trigger(event) {
        if (event in this.states[this.initial].transitions){
            this.history.push(this.initial);
            this.initial = this.states[this.initial].transitions[event];
        } else {
            throw new Error();
        }
    }

    reset() {
        this.initial = this.history[0];
        return this.initial;
    }

    getStates(event) {
        let array_names = [];
        if (!event) {
            for (let name in this.states){
                array_names.push(name);
            }
            return array_names;
        } else {
            for (let name in this.states){
                if (this.states[name].transitions[event]){
                    array_names.push(name);
                }
            }
            return array_names;
        }


    }

    undo() {
        if (this.history.length > 0){
            this.undo_history.push(this.initial);
            this.initial = this.history.pop();
            return true;
        } else {
            return false;
        }
    }

    redo() {
        if (this.undo_history > 0){
            this.initial = this.undo_history.pop();
            this.history.push(this.initial);
            return true;
        } else {
            return false;
        }
    }

    clearHistory() {
        this.initial = this.history[0];
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
