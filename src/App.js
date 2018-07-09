import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { seconds: 60 };
  timer = null;

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  pad        = time => (time < 10) ? `0${time}` : time;
  clearTimer = ()   => clearInterval(this.timer)
  addThirty  = () => this.setState({ seconds: this.state.seconds + 30 });
  
  /**
   * --------------------------------------------------
   * Set the time and start the countdown
   * --------------------------------------------------
   */
  setTime = seconds => {
    this.setState({ seconds });
    this.startTimer();
  }

  /**
   * --------------------------------------------------
   * Start our countdown
   * --------------------------------------------------
   */
  startTimer = () => {
    if (!this.timer) this.timer = setInterval(this.countDown, 1000);
  }

  /**
   * --------------------------------------------------
   * Decrement our counter
   * --------------------------------------------------
   */
  countDown = () => {
    const seconds = this.state.seconds - 1;
    this.setState({ seconds });
    if (seconds === 0) clearInterval(this.timer);
  }

  /**
   * --------------------------------------------------
   * Convert the seconds to an actual time
   * --------------------------------------------------
   */
  secondsToTime = secs => {
    const hours    = Math.floor(secs / (60 * 60));
    const divisorM = secs % (60 * 60);
    const minutes  = Math.floor(divisorM / 60);
    const divisorS = divisorM % 60;
    const seconds  = Math.ceil(divisorS);

    return { 
      hours: this.pad(hours), 
      minutes: this.pad(minutes), 
      seconds: this.pad(seconds) 
    };
  }

  /**
   * --------------------------------------------------
   * Render it
   * --------------------------------------------------
   */
  render() {
    const time = this.secondsToTime(this.state.seconds);

    return (
      <section className="hero is-fullheight is-info">
      <div className="hero-body">
      <div className="container has-text-centered">

        {/* timer number ----------------------------------- */} 
        <h1 
          className="title is-1" 
          onClick={this.addThirty}>
            {time.minutes}:{time.seconds}
        </h1>

        {/* set times -------------------------------------- */}
        <div className="action-buttons">
          <a 
            className="button is-white is-outlined is-rounded" 
            onClick={() => this.setTime(30)}>
              0:30
          </a>

          <a 
            className="button is-white is-outlined is-rounded" 
            onClick={() => this.setTime(60)}>
              1:00
          </a>

          <a 
            className="button is-white is-outlined is-rounded" 
            onClick={() => this.setTime(90)}>
              1:30
          </a>
        </div>
        
      </div>
      </div>
      </section>
    );
  }
}

export default App;
