export class Color {
  constructor(public readonly name: string, public readonly symbol: string) {}
}

export const ColorRed = new Color("Red", "R");
export const ColorBlue = new Color("Blue", "U");
export const ColorGreen = new Color("Green", "G");
export const ColorWhite = new Color("White", "W");
export const ColorBlack = new Color("Black", "B");

export const AllColors = [
  ColorRed,
  ColorBlue,
  ColorGreen,
  ColorWhite,
  ColorBlack,
];
