export class Tile {
    private _tileElement: HTMLElement;
    private _x: number;
    private _y: number;
    private _value: number;

    constructor(tileContainer: HTMLElement, value: number = Math.random() > 0.5 ? 2 : 4) {
        this._tileElement = document.createElement("div");
        this._tileElement.setAttribute("data-tile", "");
        this._tileElement.classList.add("tile");
        tileContainer.append(this._tileElement);
        this.value = value;
    }

    get value() {
        return this._value;
    }

    set value(v) {
        this._value = v;
        this._tileElement.textContent = v.toString();
        this._tileElement.classList.add(`tile__${v}`);
        this._tileElement.style.setProperty(
            "--text-lightness",
            `${v <= 8 ? 10 : 90}%`
        )
    }

    set x(value: number) {
        this._x = value
        this._tileElement.style.setProperty("--x", value.toString());
    }

    set y(value: number) {
        this._y = value
        this._tileElement.style.setProperty("--y", value.toString());
    }

    remove() {
        this._tileElement.remove()
    }

    waitForTransition(animation = false) {
        return new Promise(resolve => {
            this._tileElement.addEventListener(
                animation ? "animationend" : "transitionend",
                resolve,
                {
                    once: true,
                }
            )
        })
    }
}
