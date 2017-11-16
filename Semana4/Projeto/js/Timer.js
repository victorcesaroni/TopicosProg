function Timer(interval) {
    this.interval = interval;
    this.nextUpdate = this.currentTime();
    this.elapsedCount = 0;
}    
  
Timer.prototype.isReady = function() {
        return this.currentTime() >= this.nextUpdate;
}

Timer.prototype.stuckTime = function() {
    if (this.currentTime() <= this.nextUpdate)
        return 0;

    return this.currentTime() - this.nextUpdate;
}

Timer.prototype.stuckCount = function() {
    return Math.floor(fixedTimeTimer.stuckTime() / fixedTimeTimer.interval);
}

Timer.prototype.step = function() {
    if (this.currentTime() >= this.nextUpdate) {
        var stuck = Math.floor(this.stuckTime() / this.interval);
        this.nextUpdate += (stuck + 1) * this.interval;
        this.elapsedCount += stuck;
    }
}

Timer.prototype.currentTime = function() {
    return +new Date();
}
