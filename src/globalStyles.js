import { createGlobalStyle } from 'styled-components';
import { connect } from 'react-redux';

const GlobalStyle = createGlobalStyle`
    body{
        margin: 0;
        padding:0;
        box-sizing: border-box;
        transition: .3s ease-in-out;
    

            background-color:  ${(props) => {
              if (props.darkMode) {
                return '#1d2d50';
              }
              if (props.chosenTimer === 'pomodoro') {
                return '#841F27';
              }
              if (props.chosenTimer === 'shortBreak') {
                return '#2b5b06';
              }
              if (props.chosenTimer === 'longBreak') {
                return '#354E71';
              }
            }};
font-family: 'Lora', serif;    }
    input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}

button{
  font-family: 'Lora', serif;
}
`;

const mapStateToProps = (state) => {
  return {
    chosenTimer: state.pomo.chosenTimer,
    darkMode: state.ui.darkmode,
  };
};

export default connect(mapStateToProps, null)(GlobalStyle);
