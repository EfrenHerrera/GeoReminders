import { CreateThemeOptions } from "@rneui/themed";
import { TextStyle, ViewStyle } from "react-native";

export interface Styles {
    // Containers
    body: ViewStyle,

    title: TextStyle,
    titlesCard: TextStyle,
    titleHeader: TextStyle,
    textHeadeTable: TextStyle,
    textCellTable: TextStyle,
    subTitles: TextStyle,
    paragraph: TextStyle,
    smallText: TextStyle,
    textBold: TextStyle,
    outlinedPrimary: any,

    // Align Text
    textStart: TextStyle,
    textCenter: TextStyle,
    textEnd: TextStyle,

    // Container Box
    /**
     * @property {
     *      flexDirection: 'row'
     * }
     */
    flexRow: ViewStyle,

    // Align Box
    flexAlignStart: ViewStyle,
    alignCenter: ViewStyle,
    alignEnd: ViewStyle,
    startStart: ViewStyle,
    startCenter: ViewStyle,
    startEnd: ViewStyle,
    centerStart: ViewStyle,
    centerCenter: ViewStyle,
    betweenCenter: ViewStyle,
    centerEnd: ViewStyle,
    endStart: ViewStyle,
    endCenter: ViewStyle,
    endEnd: ViewStyle,

    alignStart: ViewStyle,
    justifyStart: ViewStyle,
    justifyBetween: ViewStyle,
    flexJustifyBetween: ViewStyle,

    // grid
    row: ViewStyle,
    rowColumn: ViewStyle,
    col: ViewStyle,
    col12: ViewStyle,
    col8: ViewStyle,
    col7: ViewStyle,
    col6: ViewStyle,
    col5: ViewStyle,
    col4: ViewStyle,
    col3: ViewStyle,
    col2: ViewStyle,
    flexGrow: ViewStyle,

    // components
    card: ViewStyle,
}


export interface ThemeWithStyles extends CreateThemeOptions {
    styles: Styles
}