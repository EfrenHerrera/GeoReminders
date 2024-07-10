import { createTheme } from "@rneui/themed";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "@shared/utils/responsive";
import { darkColors, lightColors } from "./colors";
import { ThemeWithStyles } from "@core/models/theme";

const themeOptions: ThemeWithStyles = {
  mode: "light",
  // mode: "dark",
  lightColors: lightColors,
  darkColors: darkColors,
  styles: {
    // Perzonalized Global Styles

    // Containers
    body: {
      flex: 1,
      marginHorizontal: 20,
      // paddingHorizontal: 20,
    },

    // Text
    title: {
      fontSize: wp(5),
      fontWeight: "600",
    },
    titlesCard: {
      fontSize: wp(3.7),
      fontWeight: "600",
    },
    titleHeader: {
      fontSize: wp(2.8),
      fontWeight: "500",
    },
    textHeadeTable: {
      fontSize: wp(3.2),
      fontWeight: "600",
    },
    textCellTable: {
      fontSize: wp(2.8),
      fontWeight: "400",
    },
    subTitles: {
      fontSize: wp(4),
      fontWeight: "500",
    },
    paragraph: {
      fontSize: wp(4),
      fontWeight: "400",
    },
    smallText: {
      fontSize: wp(2.7),
    },
    textBold: {
      fontWeight: "bold"
    },

    // Align Text
    textStart: {
      textAlign: "left",
    },
    textCenter: {
      textAlign: "center",
    },
    textEnd: {
      textAlign: "right",
    },

    // Container Box
    outlinedPrimary: {
      borderColor: "#1F1F1F",
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
    },

    flexRow: {
      flexDirection: "row",
    },


    alignStart: {
      alignItems: "flex-start",
    },
    justifyStart: {
      justifyContent: 'flex-start'
    },
    justifyBetween: {
      justifyContent: 'space-between'
    },
    flexJustifyBetween: {
      flexDirection: "row",
      justifyContent: 'space-between'
    },

    // Align Box
    flexAlignStart: {
      flexDirection: "row",
      alignItems: "flex-start",
    },
    alignCenter: {
      flexDirection: "row",
      alignItems: "center",
    },
    alignEnd: {
      flexDirection: "row",
      alignItems: "flex-end",
    },


    startStart: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: 'flex-start'
    },
    startCenter:{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: 'flex-start'
    },
    startEnd: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: 'flex-start'
    },

    centerStart: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "center",
    },
    centerCenter: {
      alignItems: "center",
      justifyContent: "center",
    },
    centerEnd: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center",
    },
    
    endStart: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "flex-end",
    },
    endCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    endEnd: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },

    betweenCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    // Grid
    row: {
      flexDirection: "row",
      flexWrap: "wrap",
      rowGap: 10
    },
    rowColumn: {
      flexDirection: "column",
      flexWrap: "wrap",
      gap: 10
    },

    col: {
      flexGrow: 1,
      flexShrink: 0,
      flexBasis: 0,
      width: 'auto',
      paddingRight: 0,
      paddingLeft: 0,
    },

    col12:{
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: 'auto',
      width: '100%',
    },
    col8:{
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: 'auto',
      width: '66.6666666666%',
      paddingRight: 5,
      paddingLeft: 5,
    },
    col7:{
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: 'auto',
      width: '58.3333333333%',
      paddingRight: 5,
      paddingLeft: 5,
    },
    col6:{
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: 'auto',
      width: '50%',
      paddingRight: 5,
      paddingLeft: 5,
    },
    col5:{
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: 'auto',
      width: '41.6666666667%',
      paddingRight: 5,
      paddingLeft: 5,
    },
    col4:{
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: 'auto',
      width: '33.3333333333%',
      paddingRight: 5,
      paddingLeft: 5,
    },
    col3:{
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: 'auto',
      width: '25%',
      paddingRight: 5,
      paddingLeft: 5,
    },
    col2:{
      flexShrink: 0,
      flexGrow: 0,
      flexBasis: 'auto',
      width: '16.6666666667%',
      paddingRight: 5,
      paddingLeft: 5,
    },

    flexGrow: {
      flexGrow: 1
    },

    // components
    card: {
      borderRadius: 20,
      padding: 10,
      backgroundColor: "#fff",
      borderWidth: 0,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.16,
      shadowRadius: 2.22,
      elevation: 3,
    }


  },
  components: {
    Badge: (props, theme) => ({
      badgeStyle: {
        backgroundColor:
          props.status === "success" ? theme.colors.success :
            props.status === "warning" ? theme.colors.warning :
              props.status === "error" ? theme.colors.error : theme.colors.grey1,
        borderWidth: 0,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
      },
      textStyle: {
        color: theme.colors.white,
      },
    }),
    Button: (props, theme) => {
      const { type = 'solid', color = 'primary', } = props;

      return ({
        buttonStyle: {
          padding: 3,
          borderRadius: 20,
          borderColor: theme.colors[color.toString()],
          borderWidth: type === "outline" ? 1 : 0,
          backgroundColor: type === 'solid' ? theme.colors.primary : theme.colors.white,
        },
        titleStyle: {
          fontWeight: "500",
          color: type === 'solid' ? theme.colors.white : theme.colors[color.toString()],
          paddingHorizontal: 5,
        },
      })
    },
    ButtonGroup: (props, theme) => ({
      containerStyle: {
        marginVertical: 0,
        marginHorizontal: 0,
        borderRadius: 10,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        backgroundColor: theme.colors.white,
      },
      textStyle: {
        color: theme.colors.primary,
      },

    }),
    Icon: {
      type: "material-community",
    },
    Text: (props, theme) => ({
      style: {
        color: theme.colors.primary,
        fontSize: wp(4),
      },
    }),
    Input: (props, theme) => ({
      inputStyle: {
        color: theme.colors.black,
      },
      containerStyle: {
        paddingHorizontal: 0,
      },
      inputContainerStyle: {
        borderRadius: 8,
        borderWidth: 1,
        backgroundColor: theme.colors.white,
        borderColor: theme.mode === 'dark' ? theme.colors.white : theme.colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 2,
        height: props.multiline && hp(10),
        alignItems: props.multiline ? 'flex-start' : 'center',
      },
      placeholderTextColor: theme.colors.grey0,
    }),
    Divider: {
      width: 1
    },
    Switch: (props, theme) => ({
      color: theme.colors.secondary,
    }),
    SearchBar: (props, theme) => ({
      containerStyle: {
        backgroundColor: '#0000000',
        borderWidth: 1,
        borderRadius: 8,
        padding: 0,
      },
      inputContainerStyle: {
        backgroundColor: "#0000000",
        paddingVertical: 0,
        paddingTop: 0,
        paddingHorizontal: 0
      }
    }),
    Card: (props, theme) => ({
      containerStyle: {
        margin: 0,
        borderRadius: 20,
        padding: 10,
        backgroundColor: theme.colors.background,
        borderWidth: 0,
        flexGrow:1,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.16,
        shadowRadius: 2.22,
        elevation: 3,
      },
    }),
    CheckBox: (props, theme) => ({
      containerStyle: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
      },
      textStyle: {
        color: theme.colors.primary,
      },
    })
  },
}

const theme = createTheme(themeOptions);

export default theme;

