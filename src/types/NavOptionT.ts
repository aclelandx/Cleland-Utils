import chevron from "@assets/svg/chevron.svg";

type SVGType = typeof chevron;

export interface NavOptionT {
	displayLabel: string;
	icon: SVGType;
}
