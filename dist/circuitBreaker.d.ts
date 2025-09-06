export declare class CircuitBreaker {
    private failureThreshold;
    private windowSize;
    private retryTimeout;
    private state;
    private failures;
    private lastOpened;
    private trialCall;
    constructor(failureThreshold?: number, // 50%
    windowSize?: number, // últimas 10 requests
    retryTimeout?: number);
    private failureRate;
    record(success: boolean): void;
    canCall(): boolean;
}
