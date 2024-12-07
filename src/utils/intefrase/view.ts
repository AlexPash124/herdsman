export interface IView {
    initEmitter(): void
    notifyToMediator(notification: string, data: unknown): void
    addEventListenerResize(): void
    onResize(): void
    isLandScape(): boolean
}