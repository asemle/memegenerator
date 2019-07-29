import React from 'react';

export default class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImgs: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(res => res.json())
            .then(res => {
                const { memes } = res.data;
                this.setState({
                    allMemeImgs: memes
                })
            })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        const memeImg = this.state.allMemeImgs[Math.floor(Math.random() * this.state.allMemeImgs.length)];
        this.setState({
            randomImg: memeImg.url
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className='meme-form'>
                    <input type="text" value={this.state.topText} onChange={this.handleChange} name="topText" placeholder="top text" />
                    <input type="text" value={this.state.bottomText} onChange={this.handleChange} name="bottomText" placeholder="bottom text" />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}