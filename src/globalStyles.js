import { createGlobalStyle } from "styled-components";
import { connect } from "react-redux";

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding:0;
        box-sizing: border-box;
        transition: .3s ease-in-out;
    

            background-color:  ${(props) => {
              if (props.darkMode) {
                return "#1d2d50";
              }
              if (props.chosenTimer === "pomodoro") {
                return "#bc1212";
              }
              if (props.chosenTimer === "shortBreak") {
                return "#386B1F";
              }
              if (props.chosenTimer === "longBreak") {
                return "royalblue";
              }
            }};
        font-family: 'Noto Sans JP', sans-serif;
    }
    input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
`;

const mapStateToProps = (state) => {
  return {
    chosenTimer: state.pomo.chosenTimer,
    darkMode: state.ui.darkmode,
  };
};

export default connect(mapStateToProps, null)(GlobalStyle);
