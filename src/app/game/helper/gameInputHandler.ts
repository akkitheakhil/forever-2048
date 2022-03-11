const THRESHOLD_DISTANCE = 75
const ALLOWED_GESTURE_TIME = 500

export class GameInputHandler {
    private _callback: any;
    private _boundHandleKeyboardInput: any;
    private _boundHandleTouchStart: any;
    private _gameBoardElem: any;

    constructor(callback: any, gameBoardElem: HTMLElement) {
        this._gameBoardElem = gameBoardElem
        this._boundHandleKeyboardInput = this._handleKeyboardInput.bind(this)
        this._boundHandleTouchStart = this._handleTouchStart.bind(this)
        this._callback = callback
    }

    setupInput() {
        window.addEventListener("keydown", this._boundHandleKeyboardInput, {
            once: true,
        });

        this._gameBoardElem.addEventListener(
            "touchstart",
            this._boundHandleTouchStart,
            {
                once: true,
                passive: false,
            }
        );
    }

    stopInput() {
        window.removeEventListener("keydown", this._boundHandleKeyboardInput)
        this._gameBoardElem.removeEventListener(
            "touchstart",
            this._boundHandleTouchStart
        );
    }

    private _handleTouchStart(e: TouchEvent) {
        this.stopInput();
        e.preventDefault();
        const startTouchData = e.changedTouches[0]
        const startTime: any = new Date();


        this._gameBoardElem.addEventListener("touchmove", this.handleTouchMove, {
            passive: false,
        })
        this._gameBoardElem.addEventListener(
            "touchend",
            async (e: TouchEvent) => {
                e.preventDefault();
                this._gameBoardElem.removeEventListener("touchmove", this.handleTouchMove);
                const endTouchData = e.changedTouches[0];
                const endTime = new Date() as any - startTime;
                if (endTime > ALLOWED_GESTURE_TIME) {
                    this.setupInput()
                    return
                }
                const distanceX = endTouchData.pageX - startTouchData.pageX
                const distanceY = endTouchData.pageY - startTouchData.pageY

                if (Math.abs(distanceX) >= THRESHOLD_DISTANCE) {
                    await this._callback(distanceX > 0 ? "ArrowRight" : "ArrowLeft")
                } else if (Math.abs(distanceY) >= THRESHOLD_DISTANCE) {
                    await this._callback(distanceY > 0 ? "ArrowDown" : "ArrowUp")
                }
                this.setupInput()
            },
            { once: true }
        )
    }


    handleTouchMove(e: TouchEvent) {
        e.preventDefault()
    }

    async _handleKeyboardInput(e: KeyboardEvent) {
        this.stopInput()
        await this._callback(e.key)
        this.setupInput()
    }

}