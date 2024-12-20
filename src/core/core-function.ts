
export const numberReplace = (num: number): string | number => {
    if (num < 1000) {
        return num;
    } else if (num >= 1000 && num < 10000) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        const tenThousand = Math.floor(num / 10000);
        const remainder = num % 10000;

        if (remainder === 0) {
            return `${tenThousand}만`;
        }

        const formattedRemainder = remainder.toString().padStart(4, "0");
        return `${tenThousand}만 ${formattedRemainder}`;
    }
};