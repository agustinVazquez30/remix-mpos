export enum BuyButtonVariants {
    main = 'Main',
    header = 'Header',
    secondary = 'Secondary'
}

export type BuyButtonProps = {
    label?: string;
    className?: string;
    variant?: BuyButtonVariants
}
