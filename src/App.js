import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { isRunning: false, seconds: 60 };
  timer = null;

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  pad        = time => (time < 10) ? `0${time}` : time;
  clearTimer = ()   => clearInterval(this.timer)

  addThirty = () => {
    this.setState({ seconds: this.state.seconds + 30 });
    this.start();
  }

  reset = () => {
    this.setState({ seconds: 60 });
    this.stop();
  }
  
  /**
   * --------------------------------------------------
   * Set the time and start the countdown
   * --------------------------------------------------
   */
  setTime = seconds => {
    this.setState({ seconds });
    this.start();
  }

  /**
   * --------------------------------------------------
   * Start our countdown
   * Checks to see if its running already
   * --------------------------------------------------
   */
  start = () => {
    if (!this.state.isRunning) {
      this.timer = setInterval(this.countDown, 1000);
      this.setState({ isRunning : true });
    }
  }

  /**
   * --------------------------------------------------
   * Decrement our counter
   * --------------------------------------------------
   */
  countDown = () => {
    const seconds = this.state.seconds - 1;
    this.setState({ seconds });
    if (seconds === 0) this.stop();
  }

  stop = () => {
    clearInterval(this.timer);
    this.setState({ isRunning: false });
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
    const { seconds } = this.state;
    const time = this.secondsToTime(seconds);

    // color
    let heroColor = 'is-info';
    if (seconds < 15) heroColor = 'is-danger';
    else if (seconds < 30) heroColor = 'is-warning';

    // flashing at 0
    const isFlashing = seconds === 0 ? 'is-flashing' : '';

    return (
      <section className={`hero is-fullheight ${heroColor} ${isFlashing}`}>
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
            onClick={this.reset}>
              Reset
          </a>
          {/* <a 
            className="button is-white is-large is-outlined is-rounded" 
            onClick={() => this.setTime(30)}>
              0:30
          </a>

          <a 
            className="button is-white is-large is-outlined is-rounded" 
            onClick={() => this.setTime(60)}>
              1:00
          </a>

          <a 
            className="button is-white is-large is-outlined is-rounded" 
            onClick={() => this.setTime(90)}>
              1:30
          </a> */}
        </div>
        
      </div>
      </div>
      </section>
    );
  }
}

export default App;
