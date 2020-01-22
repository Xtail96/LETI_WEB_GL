class Color {
    constructor(r, g, b, alpha) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.alpha = alpha;
    }

    getColorCode() {
        return [this.r, this.g, this.b, this.alpha];
    }

    static size() {
        return 4;
    }
}