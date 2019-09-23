import React from "react"
import moment from 'moment';

export default class Clock extends React.Component {
    state = { date: Date.now() }

    componentDidMount() {
        this.timer = setInterval(
          () => this.tick(),
          1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    tick() {
        this.setState({date: Date.now()});
    }
    
    render() {
        return (<div id="clock">
            <p id="currDate">{moment(this.state.date).format('dddd, MMMM Do, YYYY')}</p>
            <p id="currTime">{moment(this.state.date).format('h:mm')}</p>
            <p id="dateExtra">
                    <sup>{moment(this.state.date).format('ss')}</sup>
                    <sub>{moment(this.state.date).format('a')}</sub>
                 </p>
        </div>)
    }
}