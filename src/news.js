import React from "react"
import axios from 'axios';

export default class News extends React.Component {
    state = { current : 0 }

    componentDidMount() {
        this.timer = setInterval(
            () => this.rotateNews(),
            5 * 60 * 1000
        );
        this.fetchNews();
    }

    async fetchNews() {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`);
        this.setState({ news: response.data });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    rotateNews() {
        if (this.state.current >= 10) {
            this.setState({ current : 0 });
            this.fetchNews();
        }
        else {
            this.setState({ current : this.state.current + 1 });
        }
    }
    
    render() {
        if (this.state.news) {
            return (<div id="news">
                <p id="newsTitle">{`${this.state.news["articles"][this.state.current]["title"]}`.substring(0, `${this.state.news["articles"][this.state.current]["title"]}`.lastIndexOf('-')-1)}</p>
                <p id="newsDescription">{`${this.state.news["articles"][this.state.current]["description"]}`}</p>
            </div>)
        }
        else return <p></p>
    }
}