import { useTheme } from "@rneui/themed";
import { Styles } from "@core/models/theme";

export function useStyles(): Styles {
    const { replaceTheme, theme, updateTheme }: any = useTheme()
    return theme.styles
}