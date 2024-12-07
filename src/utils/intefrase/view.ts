export interface IView {
    initEmitter(): void
    notifyToMediator<T>(notification: string, data: T): void
    addEventListenerResize(): void
    onResize(): void
    isLandScape(): boolean
}