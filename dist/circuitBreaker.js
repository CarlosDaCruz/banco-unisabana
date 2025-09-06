"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CircuitBreaker = void 0;
class CircuitBreaker {
    constructor(failureThreshold = 0.5, // 50%
    windowSize = 10, // últimas 10 requests
    retryTimeout = 10000 // 10s
    ) {
        this.failureThreshold = failureThreshold;
        this.windowSize = windowSize;
        this.retryTimeout = retryTimeout;
        this.state = "CLOSED";
        this.failures = [];
        this.lastOpened = null;
        this.trialCall = false; // para controlar la llamada de prueba en HALF_OPEN
    }
    failureRate() {
        if (this.failures.length === 0)
            return 0;
        return this.failures.filter(f => f).length / this.failures.length;
    }
    record(success) {
        // Caso especial: HALF_OPEN
        if (this.state === "HALF_OPEN") {
            if (success) {
                this.state = "CLOSED";
                this.lastOpened = null;
                this.failures = []; // limpiar historial
                console.log("🟢 Circuito pasa a estado CLOSED");
            }
            else {
                this.state = "OPEN";
                this.lastOpened = Date.now();
                console.log("🔴 Circuito vuelve a estado OPEN");
            }
            this.trialCall = false;
            return; // 👈 no sigas procesando esta request
        }
        // Lógica normal: CLOSED u OPEN
        this.failures.push(!success);
        if (this.failures.length > this.windowSize) {
            this.failures.shift();
        }
        if (this.state === "CLOSED" && this.failureRate() >= this.failureThreshold) {
            this.state = "OPEN";
            this.lastOpened = Date.now();
            console.log("🔴 Circuito en estado OPEN");
        }
    }
    canCall() {
        if (this.state === "OPEN") {
            if (this.lastOpened && Date.now() - this.lastOpened > this.retryTimeout) {
                this.state = "HALF_OPEN";
                this.trialCall = true; // solo una request podrá pasar
                console.log("🟡 Circuito en HALF-OPEN, probando recurso");
                return true;
            }
            return false; // bloquea todas las llamadas mientras sigue en OPEN
        }
        if (this.state === "HALF_OPEN") {
            if (this.trialCall) {
                this.trialCall = false; // deja pasar solo una
                return true;
            }
            return false; // bloquea hasta que se confirme con record()
        }
        return true; // CLOSED
    }
}
exports.CircuitBreaker = CircuitBreaker;
//# sourceMappingURL=circuitBreaker.js.map