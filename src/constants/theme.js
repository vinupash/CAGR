export const COLORS = {
    brand: {
        primary: "#051e5e",
        secondary: "#e31836",
        background: "#f5f6fa",
        black: '#000000',
    },
    neutrals: {
        midnight: "#020f2f",
        thunder: "#727c95",
        cloud: "#b4bbce",
        platinum: '#e5e8ef',
        wine: '#9f1127',
        peach: '#d09ea7',
        candy: '#f7b9c4',
        dawn: '#fce7ec',
        charcoal: '#333333',
        steel: '#666666',
        silver: '#999999',
        pearl: '#dddddd',
        coconut: '#fafafa',
    },
    feedback: {
        error: '#ff2c55',
        caution: '#e6b800',
        success: '#30b451',
        information: '#006ee7',
        errorBG: '#ffeff2',
        cautionBG: '#fefbea',
        successBG: '#effaf2',
        informationBG: '#ebf5ff',
    }
}

export const SIZES = {
    base: 10,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    mediumLarge: 24,
    extraLarge: 28,
    xl: 32,
    xxl: 40,
    xxxl: 80,
}

export const FONT = {
    PlusJakartaSansExtraBold: 'PlusJakartaSans-ExtraBold',
    PlusJakartaSansBold: 'PlusJakartaSans-Bold',
    PlusJakartaSansRegular: 'PlusJakartaSans-Regular',
    PlusJakartaSansSemiBold: 'PlusJakartaSans-SemiBold',
}

export const SHADOWS = {
    light: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    lightPrimary: {
        shadowColor: COLORS.brand.primary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    lightSecondary: {
        shadowColor: COLORS.brand.secondary,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    medium: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    dark: {
        shadowColor: COLORS.gray,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 14,
    },
};